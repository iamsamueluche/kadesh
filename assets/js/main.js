/**
 * KA.DESH Digital - Main JavaScript
 * Digital Marketing Agency Website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initHeader();
  initMobileMenu();
  initActiveNavLink();
  initScrollReveal();
  initProjectFilter();
  initProjectCaseStudyModal();
  initFAQAccordion();
  initSuccessSlider();
  initSmoothScroll();
});

/**
 * Header scroll effect
 * Adds shadow to header when scrolled
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!toggle || !navMenu) return;

  toggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    const icon = toggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x-lg');
    } else {
      icon.classList.remove('bi-x-lg');
      icon.classList.add('bi-list');
    }
  });

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      const icon = toggle.querySelector('i');
      icon.classList.remove('bi-x-lg');
      icon.classList.add('bi-list');
    });
  });
}

/**
 * Active nav link highlighting
 * Highlights the current page in navigation
 */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Scroll reveal animation
 * Reveals elements as they scroll into view
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
}

/**
 * Project filter functionality
 * Filters projects by category
 */
function initProjectFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-item');
  
  if (filterTabs.length === 0 || projectCards.length === 0) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          // Animate in
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });
    });
  });
}

/**
 * Project case study modal
 * Opens project-specific details from the projects grid
 */
function initProjectCaseStudyModal() {
  const modalEl = document.getElementById('projectCaseStudyModal');
  const triggerLinks = document.querySelectorAll('.project-case-study-link');

  if (!modalEl || triggerLinks.length === 0) return;
  if (modalEl.dataset.initialized === 'true') return;
  if (typeof bootstrap === 'undefined' || !bootstrap.Modal) return;

  const caseStudyData = {
    techstyle: {
      client: 'TechStyle Fashion',
      name: 'TechStyle Fashion E-Commerce',
      image: 'assets/img/project-fashion.jpg',
      imageAlt: 'TechStyle Fashion storefront website preview',
      tags: ['E-Commerce', 'SEO', 'Web Design'],
      summary: 'Complete digital transformation including website redesign, SEO optimization, and multi-channel marketing campaigns.',
      challenge: 'The brand struggled with low organic traffic, high cart abandonment, and limited customer retention despite strong products.',
      strategy: 'We rebuilt the storefront UX, improved product page SEO, launched performance ad campaigns, and implemented lifecycle email automation to recover abandoned carts.',
      results: ['300% growth in online sales within 6 months', '58% increase in organic traffic', '34% improvement in conversion rate']
    },
    greenlife: {
      client: 'GreenLife Organics',
      name: 'GreenLife Organics Brand Launch',
      image: 'assets/img/service-brand.jpg',
      imageAlt: 'GreenLife Organics brand campaign visuals',
      tags: ['Branding', 'Social Media', 'Content'],
      summary: 'Full brand identity development and integrated marketing campaign for organic food startup.',
      challenge: 'GreenLife entered a crowded health-food market without strong brand awareness or a distinct market position.',
      strategy: 'We developed a brand identity system, voice guidelines, social content pillars, and launch campaigns across social and influencer channels.',
      results: ['120K+ launch campaign reach in first 60 days', '42% increase in social engagement rate', '4.2x return on launch media spend']
    },
    fintech: {
      client: 'FinTech Solutions',
      name: 'FinTech Solutions PPC Campaign',
      image: 'assets/img/project-fintech.jpg',
      imageAlt: 'FinTech Solutions PPC performance dashboard',
      tags: ['PPC', 'Analytics', 'Conversion'],
      summary: 'Strategic PPC and conversion optimization campaign for financial technology platform.',
      challenge: 'Paid acquisition costs were rising while lead quality was inconsistent across campaign types.',
      strategy: 'We restructured ad accounts, refined audience targeting, built intent-based landing pages, and rolled out continuous A/B testing on messaging and creatives.',
      results: ['47% reduction in cost per qualified lead', '2.8x increase in lead volume', '31% lift in landing page conversion rate']
    },
    wellness: {
      client: 'Wellness Hub',
      name: 'Wellness Hub Social Strategy',
      image: 'assets/img/project-wellness.jpg',
      imageAlt: 'Wellness Hub social media campaign showcase',
      tags: ['Social Media', 'Influencer', 'Content'],
      summary: 'Comprehensive social media strategy and influencer marketing campaign for wellness brand.',
      challenge: 'The brand needed consistent social growth and trusted advocacy to compete in a saturated wellness space.',
      strategy: 'We designed a content calendar, partnered with niche influencers, and introduced a UGC-first creative model for stronger community trust.',
      results: ['215% increase in monthly social reach', '89% growth in profile-driven traffic', '3.1x campaign ROI from influencer collaborations']
    },
    urbaneats: {
      client: 'Urban Eats',
      name: 'Urban Eats Restaurant Marketing',
      image: 'assets/img/project-restaurant.jpg',
      imageAlt: 'Urban Eats restaurant digital campaign highlights',
      tags: ['Local SEO', 'Content', 'Reputation'],
      summary: 'Local SEO, content marketing, and reputation management for restaurant chain.',
      challenge: 'Multiple locations had poor local search visibility and inconsistent review management.',
      strategy: 'We optimized location pages, improved local listings, deployed neighborhood-focused content, and implemented a review response workflow.',
      results: ['Top 3 local pack rankings for priority keywords', '63% growth in map-driven visits', '1.2-star average rating improvement']
    },
    proptech: {
      client: 'PropTech Realty',
      name: 'PropTech Realty Digital Presence',
      image: 'assets/img/project-realestate.jpg',
      imageAlt: 'PropTech Realty website and property content preview',
      tags: ['SEO', 'Content', 'Web Design'],
      summary: 'SEO optimization and content strategy for real estate technology platform.',
      challenge: 'The platform had strong product value but weak search visibility in high-intent property technology keywords.',
      strategy: 'We executed technical SEO fixes, built a keyword-targeted content hub, and launched authority-building link acquisition campaigns.',
      results: ['176% increase in qualified organic sessions', '54 new first-page keyword rankings', '2.4x increase in demo requests']
    },
    luxe: {
      client: 'Luxe Beauty',
      name: 'Luxe Beauty Brand Refresh',
      image: 'assets/img/service-email.jpg',
      imageAlt: 'Luxe Beauty brand refresh digital assets',
      tags: ['Branding', 'E-Commerce', 'Social'],
      summary: 'Complete brand refresh and digital marketing overhaul for luxury beauty brand.',
      challenge: 'The legacy brand identity no longer resonated with younger premium beauty customers.',
      strategy: 'We refreshed visual identity, refined brand messaging, redesigned campaign landing pages, and launched omnichannel paid and organic campaigns.',
      results: ['38% increase in returning customer rate', '3.6x growth in campaign-attributed revenue', '67% increase in branded search volume']
    },
    edutech: {
      client: 'EduTech Platform',
      name: 'EduTech Platform Growth',
      image: 'assets/img/project-edutech.jpg',
      imageAlt: 'EduTech Platform growth campaign analytics',
      tags: ['Growth Marketing', 'Email', 'PPC'],
      summary: 'Growth marketing strategy for online education platform including paid ads and email campaigns.',
      challenge: 'Course signups plateaued due to weak funnel follow-up and underperforming paid traffic quality.',
      strategy: 'We built a full-funnel acquisition model, optimized campaign segmentation, and launched automated nurture sequences for abandoned and warm leads.',
      results: ['141% increase in paid signup volume', '29% decrease in customer acquisition cost', '44% increase in trial-to-paid conversion']
    },
    activelife: {
      client: 'ActiveLife Fitness',
      name: 'ActiveLife Fitness Campaign',
      image: 'assets/img/project-fitness.jpg',
      imageAlt: 'ActiveLife Fitness social and content campaign creative',
      tags: ['Social Media', 'Content', 'Video'],
      summary: 'Integrated social media and content marketing campaign for fitness center chain.',
      challenge: 'The chain needed stronger seasonal campaign performance and consistent brand engagement across locations.',
      strategy: 'We aligned local and national creative assets, launched community challenges, and supported campaigns with short-form video and paid retargeting.',
      results: ['82% increase in campaign engagement', '27% increase in membership inquiries', '3.9x return on paid social campaigns']
    }
  };

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  const modalClient = document.getElementById('modalProjectClient');
  const modalName = document.getElementById('modalProjectName');
  const modalImage = document.getElementById('modalProjectImage');
  const modalTags = document.getElementById('modalProjectTags');
  const modalSummary = document.getElementById('modalProjectSummary');
  const modalChallenge = document.getElementById('modalProjectChallenge');
  const modalStrategy = document.getElementById('modalProjectStrategy');
  const modalResults = document.getElementById('modalProjectResults');

  function renderCaseStudy(projectId) {
    const details = caseStudyData[projectId];
    if (!details) return;

    modalClient.textContent = details.client;
    modalName.textContent = details.name;
    modalImage.src = details.image;
    modalImage.alt = details.imageAlt;
    modalTags.innerHTML = details.tags.map(tag => '<span class="tag">' + tag + '</span>').join('');
    modalSummary.textContent = details.summary;
    modalChallenge.textContent = details.challenge;
    modalStrategy.textContent = details.strategy;
    modalResults.innerHTML = details.results
      .map(item => '<li><i class="bi bi-check-circle-fill"></i> ' + item + '</li>')
      .join('');
  }

  triggerLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const projectId = this.getAttribute('data-project-id');
      renderCaseStudy(projectId);
      modal.show();
    });
  });

  modalEl.dataset.initialized = 'true';
}

/**
 * FAQ Accordion enhancements
 * Custom accordion behavior
 */
function initFAQAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-custom .accordion-item');
  
  if (accordionItems.length === 0) return;

  // Add smooth height transition
  accordionItems.forEach(item => {
    const button = item.querySelector('.accordion-button');
    const collapse = item.querySelector('.accordion-collapse');
    
    if (button && collapse) {
      collapse.addEventListener('show.bs.collapse', function() {
        item.style.borderColor = 'var(--color-primary)';
      });
      
      collapse.addEventListener('hide.bs.collapse', function() {
        item.style.borderColor = 'var(--color-border)';
      });
    }
  });
}

/**
 * Success Stories Slider
 * Bootstrap carousel wiring for success stories
 */
function initSuccessSlider() {
  const carouselEl = document.getElementById('successStoriesCarousel');
  if (!carouselEl) return;
  if (carouselEl.dataset.initialized === 'true') return;
  if (typeof bootstrap === 'undefined' || !bootstrap.Carousel) return;

  const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, {
    interval: false,
    ride: false,
    pause: true,
    wrap: true,
    touch: true,
    keyboard: false
  });

  const indicators = carouselEl.querySelectorAll('.success-carousel-indicators [data-bs-slide-to]');
  const items = carouselEl.querySelectorAll('.carousel-item');

  function getActiveIndex() {
    const itemList = Array.from(items);
    const activeIndex = itemList.findIndex(item => item.classList.contains('active'));
    return activeIndex < 0 ? 0 : activeIndex;
  }

  function syncIndicators(activeIndex) {
    indicators.forEach((indicator, index) => {
      const isActive = index === activeIndex;
      indicator.classList.toggle('active', isActive);
      if (isActive) {
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.removeAttribute('aria-current');
      }
    });
  }

  carouselEl.addEventListener('slid.bs.carousel', function(event) {
    syncIndicators(event.to);
  });

  indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      const targetIndex = Number(this.getAttribute('data-bs-slide-to'));
      syncIndicators(targetIndex);
    });
  });

  carouselEl.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      carousel.prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      carousel.next();
    }
  });

  syncIndicators(getActiveIndex());
  carouselEl.dataset.initialized = 'true';
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector('.header')?.offsetHeight || 72;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Counter animation for stats
 * Animates numbers counting up
 */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  }
  
  updateCounter();
}

/**
 * Initialize counter animations when in view
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length === 0) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Initialize counters when DOM is ready
document.addEventListener('DOMContentLoaded', initCounterAnimations);

/**
 * Form validation helper
 */
function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('is-invalid');
    } else {
      field.classList.remove('is-invalid');
    }
  });

  return isValid;
}

/**
 * Contact form handler
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  if (contactForm.dataset.initialized === 'true') return;

  const successMessage = document.getElementById('formSuccess');
  const errorMessage = document.getElementById('formError');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
    if (!validateForm(this)) return;

    const formData = new FormData(this);
    const actionUrl = this.getAttribute('action') || 'contact-submit.php';
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    fetch(actionUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(async response => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || payload.success !== true) {
          throw new Error(payload.message || 'Unable to send message.');
        }
        return payload;
      })
      .then(payload => {
        if (successMessage) {
          successMessage.textContent = payload.message || 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.';
          successMessage.style.display = 'block';
        }
        contactForm.reset();
      })
      .catch(error => {
        if (errorMessage) {
          errorMessage.textContent = error.message || 'Sorry, we could not send your message right now. Please try again.';
          errorMessage.style.display = 'block';
        }
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      });
  });

  const messageField = contactForm.querySelector('textarea[name="message"]');
  const counterText = contactForm.querySelector('.text-light');
  if (messageField && counterText) {
    const updateCounter = () => {
      counterText.textContent = messageField.value.length + '/500 characters';
    };
    updateCounter();
    messageField.addEventListener('input', updateCounter);
  }

  contactForm.dataset.initialized = 'true';
}

// Initialize contact form
document.addEventListener('DOMContentLoaded', initContactForm);

/**
 * Load header and footer partials
 * For static HTML sites without server-side includes
 */
function loadPartials() {
  const FALLBACK_HEADER_HTML = `<!-- Header / Navigation -->
<header class="header">
  <div class="container-custom">
    <a href="index.html" class="logo">
      <div class="logo-icon logo-image">
        <img src="assets/img/kadesh_logo.jpg" alt="KA.DESH Digital logo">
      </div>
    </a>
    <nav class="nav-menu">
      <a href="index.html" class="nav-link">Home</a>
      <a href="about.html" class="nav-link">About Us</a>
      <a href="services.html" class="nav-link">Services</a>
      <a href="projects.html" class="nav-link">Projects</a>
      <a href="faq.html" class="nav-link">FAQ</a>
      <a href="contact.html" class="nav-link">Contact Us</a>
      <a href="contact.html" class="btn btn-primary btn-sm d-lg-none">Get a Quote</a>
    </nav>
    <a href="contact.html" class="btn btn-primary d-none d-lg-flex">Get a Quote</a>
    <button class="mobile-menu-toggle" aria-label="Toggle menu">
      <i class="bi bi-list"></i>
    </button>
  </div>
</header>`;

  const FALLBACK_FOOTER_HTML = `<!-- Footer -->
<footer class="footer">
  <div class="container-custom">
    <div class="row g-5">
      <div class="col-lg-3 col-md-6">
        <div class="footer-logo">
          <div class="logo-icon logo-image">
            <img src="assets/img/footer_logo.png" alt="KA.DESH Digital logo">
          </div>
        </div>
        <p>Setting brands apart for digital excellence through innovative strategies and creative solutions.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/share/1Gc4a5QkJQ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" aria-label="X"><i class="bi bi-twitter-x"></i></a>
          <a href="https://www.instagram.com/kadeshdigital?igsh=MWRoMDI5OTRxYjN3bg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="https://www.linkedin.com/company/kadeshdigital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
        </div>
      </div>
      <div class="col-lg-2 col-md-6">
        <h5>Quick Links</h5>
        <ul class="footer-links">
          <li><a href="index.html"><i class="bi bi-chevron-right"></i> Home</a></li>
          <li><a href="about.html"><i class="bi bi-chevron-right"></i> About Us</a></li>
          <li><a href="services.html"><i class="bi bi-chevron-right"></i> Services</a></li>
          <li><a href="projects.html"><i class="bi bi-chevron-right"></i> Projects</a></li>
        </ul>
      </div>
      <div class="col-lg-3 col-md-6">
        <h5>Our Services</h5>
        <ul class="footer-links">
          <li><a href="services.html"><i class="bi bi-chevron-right"></i> SEO Optimization</a></li>
          <li><a href="services.html"><i class="bi bi-chevron-right"></i> Social Media Marketing</a></li>
          <li><a href="services.html"><i class="bi bi-chevron-right"></i> PPC Advertising</a></li>
          <li><a href="services.html"><i class="bi bi-chevron-right"></i> Brand Strategy</a></li>
          <li><a href="services.html"><i class="bi bi-chevron-right"></i> Content Marketing</a></li>
          <li><a href="services.html"><i class="bi bi-chevron-right"></i> Email Marketing</a></li>
        </ul>
      </div>
      <div class="col-lg-4 col-md-6">
        <h5>Contact Us</h5>
        <div class="footer-contact">
          <p><i class="bi bi-geo-alt-fill"></i><span>Number 9, Irebawa Street, Ogba<br>Lagos, Nigeria</span></p>
          <p><i class="bi bi-telephone-fill"></i><span>+234 703 271 6640</span></p>
          <p><i class="bi bi-envelope-fill"></i><span>hello@kadesh.digital</span></p>
          <p><i class="bi bi-clock-fill"></i><span>Mon - Fri: 9:00 AM - 6:00 PM<br>Sat: 10:00 AM - 4:00 PM</span></p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 KADESH Digital. All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Kadesh Digital</a>
      </div>
    </div>
  </div>
</footer>`;

  function getPartialsBaseUrl() {
    const mainScript = document.querySelector('script[src*="assets/js/main.js"]');
    if (mainScript) {
      return new URL('../../partials/', mainScript.src);
    }
    return new URL('partials/', window.location.href);
  }

  function loadPartial(placeholder, fileName, fallbackHtml, callback) {
    const partialUrl = new URL(fileName, getPartialsBaseUrl()).toString();

    fetch(partialUrl, { cache: 'no-cache' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch: ' + response.status);
        }
        return response.text();
      })
      .then(html => {
        placeholder.innerHTML = html;
        if (typeof callback === 'function') callback();
      })
      .catch(error => {
        console.warn('Using fallback partial for', fileName, error);
        placeholder.innerHTML = fallbackHtml;
        if (typeof callback === 'function') callback();
      });
  }

  // Load header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    loadPartial(headerPlaceholder, 'header.html', FALLBACK_HEADER_HTML, function() {
      initHeader();
      initMobileMenu();
      initActiveNavLink();
    });
  }

  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    loadPartial(footerPlaceholder, 'footer.html', FALLBACK_FOOTER_HTML);
  }
}

// Load partials when DOM is ready
document.addEventListener('DOMContentLoaded', loadPartials);
