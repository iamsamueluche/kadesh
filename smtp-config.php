<?php
declare(strict_types=1);

return [
    // Hostinger SMTP defaults:
    // host => smtp.hostinger.com, port => 465 (ssl) or 587 (tls)
    'host' => 'smtp.hostinger.com',
    'port' => 465,
    'encryption' => 'ssl', // ssl, tls, or none
    'username' => 'hello@kadeshdigital.com',
    'password' => 'PeaceKadesh2025!',

    // Mail envelope/from + recipient
    'from_email' => 'hello@kadeshdigital.com',
    'from_name' => 'KADESH Digital',
    'to_email' => 'hello@kadeshdigital.com',

    // Socket timeout in seconds
    'timeout' => 20,
];
