<?php
declare(strict_types=1);

function wants_json_response(): bool
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    $xhr = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? '';
    return stripos($accept, 'application/json') !== false || stripos($xhr, 'xmlhttprequest') !== false;
}

function respond(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);

    if (wants_json_response()) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode([
            'success' => $success,
            'message' => $message,
        ]);
        exit;
    }

    $location = 'contact.html?status=' . ($success ? 'success' : 'error');
    header('Location: ' . $location);
    exit;
}

function smtp_read($socket): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (preg_match('/^\d{3}\s/', $line) === 1) {
            break;
        }
    }
    return $response;
}

function smtp_expect(string $response, array $codes): bool
{
    foreach ($codes as $code) {
        if (strpos($response, (string)$code) === 0) {
            return true;
        }
    }
    return false;
}

function smtp_command($socket, string $command, array $codes): string
{
    fwrite($socket, $command . "\r\n");
    $response = smtp_read($socket);
    if (!smtp_expect($response, $codes)) {
        throw new RuntimeException('SMTP command failed: ' . trim($response));
    }
    return $response;
}

function dot_stuff(string $text): string
{
    return preg_replace('/^\./m', '..', $text) ?? $text;
}

function send_via_smtp(array $smtp, string $replyName, string $replyEmail, string $subject, string $body): void
{
    $host = (string)($smtp['host'] ?? '');
    $port = (int)($smtp['port'] ?? 587);
    $username = (string)($smtp['username'] ?? '');
    $password = (string)($smtp['password'] ?? '');
    $encryption = strtolower((string)($smtp['encryption'] ?? 'tls'));
    $fromEmail = (string)($smtp['from_email'] ?? '');
    $fromName = (string)($smtp['from_name'] ?? 'KADESH Digital');
    $toEmail = (string)($smtp['to_email'] ?? '');
    $timeout = (int)($smtp['timeout'] ?? 20);

    if ($host === '' || $username === '' || $password === '' || $fromEmail === '' || $toEmail === '') {
        throw new RuntimeException('SMTP is not configured. Please update smtp-config.php.');
    }

    $connectHost = $encryption === 'ssl' ? 'ssl://' . $host : $host;
    $socket = @stream_socket_client(
        $connectHost . ':' . $port,
        $errno,
        $errstr,
        $timeout,
        STREAM_CLIENT_CONNECT
    );

    if (!$socket) {
        throw new RuntimeException('SMTP connection failed: ' . $errstr . ' (' . $errno . ')');
    }

    stream_set_timeout($socket, $timeout);

    $greeting = smtp_read($socket);
    if (!smtp_expect($greeting, [220])) {
        fclose($socket);
        throw new RuntimeException('SMTP greeting failed: ' . trim($greeting));
    }

    try {
        smtp_command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);

        if ($encryption === 'tls') {
            smtp_command($socket, 'STARTTLS', [220]);
            $cryptoEnabled = stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
            if ($cryptoEnabled !== true) {
                throw new RuntimeException('Unable to enable TLS encryption.');
            }
            smtp_command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);
        }

        smtp_command($socket, 'AUTH LOGIN', [334]);
        smtp_command($socket, base64_encode($username), [334]);
        smtp_command($socket, base64_encode($password), [235]);

        smtp_command($socket, 'MAIL FROM:<' . $fromEmail . '>', [250]);
        smtp_command($socket, 'RCPT TO:<' . $toEmail . '>', [250, 251]);
        smtp_command($socket, 'DATA', [354]);

        $safeSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
        $safeReplyName = preg_replace('/[\r\n]+/', ' ', $replyName) ?: 'Website Visitor';
        $safeReplyEmail = preg_replace('/[\r\n]+/', '', $replyEmail) ?: $fromEmail;

        $headers = [];
        $headers[] = 'Date: ' . date(DATE_RFC2822);
        $headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
        $headers[] = 'To: ' . $toEmail;
        $headers[] = 'Reply-To: ' . $safeReplyName . ' <' . $safeReplyEmail . '>';
        $headers[] = 'Subject: ' . $safeSubject;
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-Type: text/plain; charset=UTF-8';
        $headers[] = 'Content-Transfer-Encoding: 8bit';

        $message = implode("\r\n", $headers) . "\r\n\r\n" . dot_stuff($body) . "\r\n.";
        fwrite($socket, $message . "\r\n");

        $response = smtp_read($socket);
        if (!smtp_expect($response, [250])) {
            throw new RuntimeException('SMTP message delivery failed: ' . trim($response));
        }

        smtp_command($socket, 'QUIT', [221]);
        fclose($socket);
    } catch (Throwable $e) {
        fclose($socket);
        throw $e;
    }
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

$honeypot = trim((string)($_POST['website'] ?? ''));
if ($honeypot !== '') {
    respond(true, 'Thank you! Your message has been sent successfully.');
}

$fullName = trim((string)($_POST['full_name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$company = trim((string)($_POST['company'] ?? ''));
$service = trim((string)($_POST['service'] ?? ''));
$budget = trim((string)($_POST['budget'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($fullName === '' || $email === '' || $service === '' || $message === '') {
    respond(false, 'Please complete all required fields.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please provide a valid email address.', 422);
}

if (mb_strlen($message) > 5000) {
    respond(false, 'Message is too long.', 422);
}

$emailSubject = 'New Contact Inquiry - ' . $service;
$emailBody = "New contact form submission\n\n";
$emailBody .= "Full Name: {$fullName}\n";
$emailBody .= "Email: {$email}\n";
$emailBody .= "Phone: " . ($phone !== '' ? $phone : 'Not provided') . "\n";
$emailBody .= "Company: " . ($company !== '' ? $company : 'Not provided') . "\n";
$emailBody .= "Service: {$service}\n";
$emailBody .= "Budget: " . ($budget !== '' ? $budget : 'Not provided') . "\n\n";
$emailBody .= "Message:\n{$message}\n";

$smtp = [];
$configFile = __DIR__ . '/smtp-config.php';
if (is_file($configFile)) {
    $loaded = require $configFile;
    if (is_array($loaded)) {
        $smtp = $loaded;
    }
}

try {
    send_via_smtp($smtp, $fullName, $email, $emailSubject, $emailBody);
    respond(true, 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.');
} catch (Throwable $e) {
    respond(false, 'We could not send your message right now. Please try again in a few minutes.', 500);
}

