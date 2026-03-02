# KA.DESH Digital - Website Design Document

## Part 1: Visual Design System (Global Styles)

### Color Palette

| Token Name | HEX Value | Usage |
|------------|-----------|-------|
| `--color-primary` | #6B21A8 | Primary purple - headers, buttons, accents |
| `--color-primary-dark` | #581C87 | Dark purple - footer background, hover states |
| `--color-primary-light` | #A855F7 | Light purple - gradients, highlights |
| `--color-accent` | #FBBF24 | Yellow/Gold - accent text, badges, CTAs |
| `--color-accent-hover` | #F59E0B | Darker yellow - hover states |
| `--color-white` | #FFFFFF | White backgrounds, text on dark |
| `--color-bg-light` | #F9FAFB | Light gray background sections |
| `--color-bg-purple` | #7C3AED | Purple gradient backgrounds |
| `--color-text-primary` | #1F2937 | Dark gray - main body text |
| `--color-text-secondary` | #6B7280 | Medium gray - secondary text |
| `--color-text-light` | #9CA3AF | Light gray - captions, hints |
| `--color-border` | #E5E7EB | Border color for cards, inputs |
| `--color-card-bg` | #FFFFFF | Card backgrounds |

### Typography System

| Element | Font Family | Size | Weight | Line Height | Letter Spacing |
|---------|-------------|------|--------|-------------|----------------|
| H1 (Hero) | Inter/System | 48-56px | 700 (Bold) | 1.1 | -0.02em |
| H2 (Section) | Inter/System | 36-42px | 700 (Bold) | 1.2 | -0.01em |
| H3 (Card Title) | Inter/System | 20-24px | 600 (Semibold) | 1.3 | 0 |
| H4 (Subtitle) | Inter/System | 18px | 600 (Semibold) | 1.4 | 0 |
| Body Large | Inter/System | 18px | 400 (Regular) | 1.6 | 0 |
| Body | Inter/System | 16px | 400 (Regular) | 1.6 | 0 |
| Body Small | Inter/System | 14px | 400 (Regular) | 1.5 | 0 |
| Caption | Inter/System | 12px | 500 (Medium) | 1.4 | 0.02em |
| Button | Inter/System | 14-16px | 600 (Semibold) | 1 | 0.01em |
| Nav Link | Inter/System | 15px | 500 (Medium) | 1 | 0 |

### Layout Grid & Spacing

- **Container Max Width**: 1280px
- **Grid System**: 12-column Bootstrap grid
- **Gutter Width**: 24px (desktop), 16px (mobile)
- **Section Padding**: 80px vertical (desktop), 48px (mobile)
- **Spacing Scale**: 4px base unit (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)

### Component Primitives

#### Buttons

**Primary Button (Purple)**
- Background: #6B21A8
- Text: #FFFFFF
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: 600
- Hover: Background #581C87, slight lift shadow

**Secondary Button (Yellow)**
- Background: #FBBF24
- Text: #1F2937
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: 600
- Hover: Background #F59E0B

**Outline Button**
- Background: transparent
- Border: 2px solid #6B21A8
- Text: #6B21A8
- Padding: 10px 22px
- Border Radius: 8px
- Hover: Background #6B21A8, Text #FFFFFF

**Ghost Button**
- Background: transparent
- Text: #6B21A8
- Padding: 12px 24px
- Hover: Background rgba(107, 33, 168, 0.1)

#### Cards

**Service Card**
- Background: #FFFFFF
- Border Radius: 16px
- Padding: 24px
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Border: 1px solid #E5E7EB
- Icon Container: 48px circle, light purple bg (#F3E8FF)

**Project Card**
- Background: #FFFFFF
- Border Radius: 16px
- Overflow: hidden
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Image Height: 200px
- Content Padding: 20px

**Team Card**
- Background: #FFFFFF
- Border Radius: 16px
- Overflow: hidden
- Shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Image: Full width, 280px height
- Content Padding: 20px

#### Form Inputs

- Background: #FFFFFF
- Border: 1px solid #E5E7EB
- Border Radius: 8px
- Padding: 12px 16px
- Font Size: 16px
- Focus: Border #6B21A8, ring 2px rgba(107, 33, 168, 0.2)
- Placeholder: #9CA3AF

#### Badges/Tags

- Background: #F3E8FF (light purple)
- Text: #6B21A8
- Padding: 4px 12px
- Border Radius: 20px (pill)
- Font Size: 12px
- Font Weight: 500

---

## Part 2: Global Animations & Interactions

### Core Experience

**Page Load Sequence**
- Header fades in: duration 400ms, ease-out
- Hero content staggered reveal: 100ms delay between elements
- Sections fade in on scroll with 20px upward translate

**Smooth Scrolling**
- Behavior: smooth
- Duration: 500ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Micro-interactions

**Button Hover Effects**
- Scale: 1.02
- Shadow increase
- Duration: 200ms
- Easing: ease-out

**Card Hover Effects**
- Translate Y: -4px
- Shadow increase: 0 10px 25px -5px rgba(0, 0, 0, 0.15)
- Duration: 300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

**Link Hover**
- Color transition to primary
- Duration: 200ms

**Navigation Active State**
- Underline indicator
- Color: #6B21A8
- Font weight increase

### Technical Specs

- **Default Duration**: 300ms
- **Fast Duration**: 150ms
- **Slow Duration**: 500ms
- **Default Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Bounce Easing**: cubic-bezier(0.68, -0.55, 0.265, 1.55)
- **Performance**: Use transform and opacity only for animations

---

## Part 3: Content Sections Breakdown

### Section: Header/Navigation

**1. Layout & Composition**
- **Structure**: Flexbox row, justify-between, align-center
- **Positioning**: Fixed top, z-index 1000, white background
- **Height**: 72px
- **Container**: Max-width 1280px, centered
- **Responsive**: Hamburger menu on mobile

**2. Visual Styling**
- Background: #FFFFFF
- Border bottom: 1px solid #E5E7EB (subtle)
- Shadow on scroll: 0 2px 10px rgba(0,0,0,0.05)

**3. Interaction & Motion**
- Scroll: Add shadow when scrolled
- Nav links: Hover color change to purple
- Active link: Purple color with underline
- Mobile menu: Slide in from right

**4. Content & Copy**
- Logo: "KA.DESH Digital" with "Digital Marketing Agency" tagline
- Nav Items: Home, About Us, Services, Projects, FAQ, Contact Us
- CTA Button: "Get a Quote" (purple button)

---

### Section: Hero (Home Page)

**1. Layout & Composition**
- **Structure**: Two-column grid (60% text, 40% image)
- **Background**: Purple gradient (#7C3AED to #6B21A8)
- **Padding**: 120px top, 80px bottom
- **Responsive**: Stack vertically on mobile

**2. Visual Styling**
- Background: Linear gradient purple
- Badge: "Digital Marketing Excellence" - yellow pill badge
- Heading: White text with yellow accent on "Digital Excellence"
- Subheading: White/light purple text
- Stats row: 3 columns with large numbers

**3. Interaction & Motion**
- Text reveal on load with stagger
- Image subtle float animation
- Stats counter animation

**4. Content & Copy**
- Badge: "Digital Marketing Excellence"
- Heading: "Setting Brands Apart for Digital Excellence"
- Subheading: "We transform businesses through innovative digital strategies, creative campaigns, and data-driven results that exceed expectations."
- Buttons: "Start Your Journey" (yellow), "View Our Work" (outline white)
- Stats: "500+ Projects Delivered", "98% Client Satisfaction", "50+ Team Experts"

**5. Image Asset Mapping**
| Asset | Type | Placement | Description |
|-------|------|-----------|-------------|
| hero-team.jpg | Photo | Right column | Team working in modern office |

---

### Section: Services Grid (Home Page)

**1. Layout & Composition**
- **Structure**: Section title + 3x2 grid of service cards
- **Background**: White
- **Padding**: 80px vertical
- **Card Grid**: 3 columns desktop, 2 tablet, 1 mobile

**2. Visual Styling**
- Section title: Centered, purple
- Cards: White with subtle shadow, rounded corners
- Icon: Purple circle background with white icon
- Title: Purple, semibold
- Description: Gray text

**3. Interaction & Motion**
- Cards fade in on scroll with stagger
- Card hover: lift effect

**4. Content & Copy**
- Title: "Our Services"
- Subtitle: "Comprehensive digital solutions tailored to elevate your brand and drive measurable results."
- Services:
  1. SEO Optimization (search icon)
  2. Social Media Marketing (share icon)
  3. PPC Advertising (mouse pointer icon)
  4. Brand Strategy (target icon)
  5. Analytics & Insights (bar chart icon)
  6. Email Marketing (mail icon)
- CTA: "Explore All Services" (purple button)

---

### Section: About Preview (Home Page)

**1. Layout & Composition**
- **Structure**: Two-column (image left, text right)
- **Background**: Light gray (#F9FAFB)
- **Padding**: 80px vertical

**2. Visual Styling**
- Image: Rounded corners, shadow
- Badge: "About Us" - purple pill
- Heading: Purple with yellow accent
- Check items: Purple checkmarks

**3. Content & Copy**
- Badge: "About Us"
- Heading: "Crafting Digital Success Stories Since 2015"
- Paragraphs: Company description
- Check items: "Award-Winning Team", "Proven Results"
- CTA: "Learn More About Us" (yellow button)

---

### Section: Success Stories (Home Page)

**1. Layout & Composition**
- **Structure**: Section title + carousel/slider
- **Background**: Purple gradient
- **Padding**: 80px vertical

**2. Visual Styling**
- Title: White
- Card: White background, rounded
- Image: Left side of card
- Content: Right side with category badge

**3. Interaction & Motion**
- Slider with dots navigation
- Auto-play optional
- Smooth slide transition

**4. Content & Copy**
- Title: "Success Stories"
- Subtitle: "Real results for real businesses. See how we've helped our clients achieve remarkable growth."
- Featured Story:
  - Category: "TechStyle Fashion"
  - Title: "E-Commerce Revolution"
  - Description: "300% increase in online sales within 6 months through strategic digital campaigns and UX optimization."
  - CTA: "View Full Case Study"

---

### Section: FAQ Preview (Home Page)

**1. Layout & Composition**
- **Structure**: Centered title + accordion items
- **Background**: White
- **Padding**: 80px vertical
- **Max Width**: 800px centered

**2. Visual Styling**
- Accordion: White cards with border
- Plus icon: Purple, rotates to X when open

**3. Content & Copy**
- Title: "Frequently Asked Questions"
- Subtitle: "Quick answers to common questions about our services"
- Questions:
  1. "What makes KA.DESH Digital different from other agencies?"
  2. "How long does it take to see results from digital marketing?"
  3. "Do you work with businesses of all sizes?"
- CTA: "View All FAQs" (purple button)

---

### Section: CTA Banner (Home Page)

**1. Layout & Composition**
- **Structure**: Centered text with buttons
- **Background**: Purple gradient
- **Padding**: 80px vertical

**2. Visual Styling**
- Heading: White with yellow accent
- Subheading: Light text
- Buttons: Yellow primary, outline white secondary

**3. Content & Copy**
- Heading: "Ready to Transform Your Digital Presence?"
- Subheading: "Let's create something extraordinary together. Our team is ready to help you achieve your digital marketing goals and drive real business growth."
- Buttons: "Get Started Today" (yellow), "Call Us Now" (outline)

---

### Section: Footer

**1. Layout & Composition**
- **Structure**: 4-column grid
- **Background**: Dark purple (#581C87)
- **Padding**: 64px top, 32px bottom

**2. Visual Styling**
- Logo: White version
- Text: White/light purple
- Links: Light purple, hover white
- Social icons: Circular buttons

**3. Content & Copy**
- Column 1: Logo, tagline, social icons
- Column 2: Quick Links (Home, About Us, Services, Projects)
- Column 3: Our Services (SEO, Social Media, PPC, Brand Strategy, Content, Email)
- Column 4: Contact Info (address, phone, email, hours)
- Bottom: Copyright, Privacy Policy, Terms, Website Builder credit

---

### Section: Hero (About Page)

**1. Layout & Composition**
- **Structure**: Centered text
- **Background**: Purple gradient
- **Padding**: 100px vertical

**2. Content & Copy**
- Badge: "About Us"
- Heading: "Empowering Brands Through Digital Innovation"
- Subheading: "We're a team of passionate digital marketers, creative designers, and strategic thinkers dedicated to transforming businesses in the digital age."

---

### Section: Our Story (About Page)

**1. Layout & Composition**
- **Structure**: Two-column (image left, text right)
- **Background**: White
- **Padding**: 80px vertical

**2. Content & Copy**
- Heading: "Our Story"
- Paragraphs: Company history since 2015
- Stats: "8+ Years", "500+ Clients", "50+ Team Members"

---

### Section: Mission & Vision (About Page)

**1. Layout & Composition**
- **Structure**: Two-column cards
- **Background**: Light gray
- **Padding**: 80px vertical

**2. Content & Copy**
- Mission Card: Icon, "Our Mission", description
- Vision Card: Icon, "Our Vision", description

---

### Section: Core Values (About Page)

**1. Layout & Composition**
- **Structure**: 4-column grid
- **Background**: White
- **Padding**: 80px vertical

**2. Content & Copy**
- Title: "Our Core Values"
- Values: Innovation, Collaboration, Results-Driven, Integrity

---

### Section: Team (About Page)

**1. Layout & Composition**
- **Structure**: 3-column grid of team cards
- **Background**: Light gray
- **Padding**: 80px vertical

**2. Content & Copy**
- Title: "Meet Our Team"
- Team Members:
  1. Sarah Johnson - Founder & CEO
  2. Michael Chen - Creative Director
  3. Emily Rodriguez - Head of Strategy
  4. David Thompson - SEO Specialist
  5. Lisa Park - Social Media Manager
  6. James Wilson - Analytics Lead

---

### Section: Hero (Services Page)

**1. Layout & Composition**
- **Structure**: Centered text
- **Background**: Purple gradient
- **Padding**: 100px vertical

**2. Content & Copy**
- Badge: "Our Services"
- Heading: "Comprehensive Digital Solutions"
- Subheading: "From SEO to social media, we offer a full suite of digital marketing services designed to help your business thrive online."

---

### Section: Service Details (Services Page)

**1. Layout & Composition**
- **Structure**: Alternating two-column layout (image left/right)
- **Background**: White/Light gray alternating
- **Padding**: 80px vertical per service

**2. Content & Copy**
Services with detailed descriptions:
1. SEO Optimization
2. Social Media Marketing
3. PPC Advertising
4. Brand Strategy
5. Content Marketing
6. Email Marketing
7. Analytics & Insights
8. Mobile Marketing
9. E-Commerce Marketing

Each includes:
- Title
- Description
- "What's Included" checklist
- "Get Started" button

---

### Section: Our Process (Services Page)

**1. Layout & Composition**
- **Structure**: 4-column numbered steps
- **Background**: Light gray
- **Padding**: 80px vertical

**2. Content & Copy**
- Title: "Our Process"
- Steps:
  1. Discovery
  2. Strategy
  3. Execution
  4. Optimization

---

### Section: Hero (Projects Page)

**1. Layout & Composition**
- **Structure**: Centered text
- **Background**: Purple gradient
- **Padding**: 100px vertical

**2. Content & Copy**
- Badge: "Our Work"
- Heading: "Success Stories That Inspire"
- Subtitle: "Explore our portfolio of successful digital marketing campaigns and transformative brand experiences."

---

### Section: Filter Tabs (Projects Page)

**1. Layout & Composition**
- **Structure**: Horizontal pill tabs
- **Background**: White
- **Padding**: 32px vertical

**2. Visual Styling**
- Tabs: Pill shape, purple active, gray inactive
- Filters: All, Branding, Social, SEO, Ecommerce, Content

---

### Section: Projects Grid (Projects Page)

**1. Layout & Composition**
- **Structure**: 3-column grid of project cards
- **Background**: Light gray
- **Padding**: 48px vertical

**2. Content & Copy**
Projects:
1. TechStyle Fashion E-Commerce (E-Commerce, SEO, Web Design)
2. GreenLife Organics Brand Launch (Branding, Social Media, Content)
3. FinTech Solutions PPC Campaign (PPC, Analytics, Conversion)
4. Wellness Hub Social Strategy (Social Media, Influencer, Content)
5. Urban Eats Restaurant Marketing (Local SEO, Content, Reputation)
6. PropTech Realty Digital Presence (SEO, Content, Web Design)
7. Luxe Beauty Brand Refresh (Branding, E-Commerce, Social)
8. EduTech Platform Growth (Growth Marketing, Email, PPC)
9. ActiveLife Fitness Campaign (Social Media, Content, Video)

---

### Section: Our Impact (Projects Page)

**1. Layout & Composition**
- **Structure**: 4-column stats
- **Background**: White
- **Padding**: 80px vertical

**2. Content & Copy**
- Title: "Our Impact"
- Stats:
  - 500+ Projects Completed
  - 98% Client Satisfaction
  - 350% Average ROI
  - 50+ Industry Awards

---

### Section: Hero (FAQ Page)

**1. Layout & Composition**
- **Structure**: Centered text
- **Background**: Purple gradient
- **Padding**: 100px vertical

**2. Content & Copy**
- Badge: "FAQ"
- Heading: "Frequently Asked Questions"
- Subheading: "Find answers to common questions about our services, process, and how we can help your business grow."

---

### Section: FAQ Categories (FAQ Page)

**1. Layout & Composition**
- **Structure**: Category sections with accordions
- **Background**: White
- **Padding**: 80px vertical

**2. Content & Copy**
Categories:
1. General Questions (4 items)
2. Services & Pricing (4 items)
3. Process & Timeline (4 items)
4. Technical Questions (4 items)
5. Results & ROI (4 items)

---

### Section: Still Have Questions (FAQ Page)

**1. Layout & Composition**
- **Structure**: Centered CTA card
- **Background**: Light gray
- **Padding**: 80px vertical

**2. Content & Copy**
- Icon: Headset
- Title: "Still Have Questions?"
- Text: "Can't find the answer you're looking for? Our team is here to help."
- Buttons: "Contact Us", "Call Us Now"

---

### Section: Hero (Contact Page)

**1. Layout & Composition**
- **Structure**: Centered text
- **Background**: Purple gradient
- **Padding**: 100px vertical

**2. Content & Copy**
- Badge: "Get In Touch"
- Heading: "Let's Start Your Digital Journey"
- Subheading: "Ready to transform your digital presence? Contact us today and let's discuss how we can help your business grow."

---

### Section: Contact Form & Info (Contact Page)

**1. Layout & Composition**
- **Structure**: Two-column (form left, info right)
- **Background**: White
- **Padding**: 80px vertical

**2. Content & Copy**
Form Fields:
- Full Name *
- Email Address *
- Phone Number
- Company Name
- Service Interested In (dropdown)
- Monthly Budget (dropdown)
- Project Details (textarea)
- Submit: "Send Message"

Contact Info:
- Office Address
- Phone
- Email
- Business Hours
- Social Links
- "Need Immediate Assistance?" card

---

### Section: Map (Contact Page)

**1. Layout & Composition**
- **Structure**: Full-width map
- **Background**: White
- **Padding**: 48px vertical

**2. Content & Copy**
- Title: "Visit Our Office"
- Subtitle: "Located in the heart of New York City"
- Google Maps embed
