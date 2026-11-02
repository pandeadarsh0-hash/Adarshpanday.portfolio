/**
 * ADARSH PANDAY - Motion Designer & Video Editor Portfolio
 * SEO-Optimized, High-End Minimalist Personal Portfolio
 * Interactive Spotlight Tracker, Media Gallery Filters, Video Lightbox Modal, and Form Handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlightFollower();
  initNavbarScroll();
  initMobileMenu();
  initMediaGallery();
  initProjectModal();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. Interactive Spotlight Glow Follower
   ========================================================================== */
function initSpotlightFollower() {
  const glow = document.getElementById('spotlightGlow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;

  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(updateSpotlight);
    }
  }, { passive: true });

  function updateSpotlight() {
    const ease = 0.15;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

    if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
      requestAnimationFrame(updateSpotlight);
    } else {
      isMoving = false;
    }
  }

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });
}

/* ==========================================================================
   2. Sticky Glass Navbar & Active Section Tracking
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   3. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-btn');

  if (!toggle || !drawer) return;

  function setDrawer(open) {
    if (open) {
      drawer.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  toggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    setDrawer(!isOpen);
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      setDrawer(false);
    });
  });
}

/* ==========================================================================
   4. Media Gallery (Unified Showcase)
   ========================================================================== */
function initMediaGallery() {
  const mediaCards = document.querySelectorAll('.media-card');
  mediaCards.forEach(card => {
    card.style.display = 'flex';
  });
}

/* ==========================================================================
   5. Interactive Video Project Lightbox (Responsive Iframe Integration)
   ========================================================================== */
const PROJECTS_DATA = {
  'project-1': {
    id: 'project-1',
    title: 'Spokes Digital – European Expansion Campaign',
    client: 'Role: Motion Graphics Designer & Video Editor',
    category: 'B2B PROMOTIONAL CAMPAIGN',
    year: '2026',
    embedUrl: 'https://www.youtube-nocookie.com/embed/KTK0sIqbvaM?autoplay=1&rel=0',
    description: 'Produced a dynamic B2B promotional campaign video highlighting a digital marketing agency’s expansion into Europe and upcoming appearance at ICBC Berlin. Crafted with high-end vector animation, kinetic typography, strategic metric overlays, and seamless branding alignment.',
    services: ['High-End Vector Animation', 'Kinetic Typography', 'Strategic Metric Overlays', 'Branding Alignment', 'Video Editing'],
    metric: 'B2B Campaign // ICBC Berlin 2026'
  },
  'project-2': {
    id: 'project-2',
    title: 'GuruAi Labs – Autonomous Intelligence Promo',
    client: 'Role: Lead Motion Graphics Designer & Video Editor',
    category: 'TECH EXPLAINER & AI PROMO',
    year: '2026',
    embedUrl: 'https://www.youtube-nocookie.com/embed/DlzLvZY49vc?autoplay=1&rel=0',
    description: 'Produced a sleek, concept-driven tech promotional video for GuruAi Labs, highlighting their specialized custom AI agents and autonomous intelligence solutions for visual industries. Blends smooth vector animations, fluid brand transitions, mobile UI app mockups, and synchronized kinetic typography.',
    services: [
      'Conceptual Motion Design (2D/3D Animations & Logo Reveals)',
      'UI/UX Mobile Mockup Integration (Vertical Industry Flow)',
      'Kinetic Typography & Voiceover Pacing',
      'Brand Cohesion & Fluid Gradients'
    ],
    metric: 'Tech Explainer // 4K 60 FPS Cut'
  },
  'project-3': {
    id: 'project-3',
    title: 'Ask Bud-I – AI Virtual Budtender Promo',
    client: 'Role: Lead Motion Graphics Designer & Video Editor',
    category: 'SAAS PRODUCT & APP UI/UX PROMO',
    year: '2026',
    embedUrl: 'https://www.youtube-nocookie.com/embed/KkMcVA375fI?autoplay=1&rel=0',
    description: 'Produced a dynamic promotional and product explainer video for Ask Bud-I, an AI-powered virtual assistant and dispensary growth platform. Showcases a seamless blend of conversational chat UI simulations, mobile app mockups, and backend data analytics dashboards to highlight the product’s core capabilities.',
    services: [
      'UI/UX & Mockup Animation (Mobile Chat Interfaces & Query Flows)',
      'Kinetic Typography & Pacing (Feature Callouts & Intent Synchronization)',
      'Dashboard & Data Visualization (Administrative Analytics & Scaling Insights)',
      'Brand Cohesion (Dark-Mode Modern Tech Aesthetic)'
    ],
    metric: 'SaaS Product Promo // 1080p 60 FPS'
  },
  'project-4': {
    id: 'project-4',
    title: 'AI Minds – Autonomous Intelligence Promo',
    client: 'Role: Lead Motion Graphics Designer & Video Editor',
    category: 'SAAS EXPLAINER & AI BRAND COMMERCIAL',
    year: '2026',
    embedUrl: 'https://www.youtube-nocookie.com/embed/3ozaAHSm7u0?autoplay=1&rel=0',
    description: 'Produced a dynamic commercial and product explainer for AI Minds, highlighting their custom autonomous AI agents designed to automate customer support, sales, and e-commerce workflows. The video seamlessly blends live-action footage, dynamic UI overlays, and complex backend data representations.',
    services: [
      'Hybrid Media Integration (Live-Action Footage & App Interfaces)',
      'Kinetic Typography & Pacing (Fast-Paced Problem-Solution Hooks)',
      'Data & UI Visualization (Animated Roadmaps & Analytics Dashboards)',
      'Brand Cohesion (High-End Corporate Tech Aesthetic & Gradients)'
    ],
    metric: 'AI Commercial // 4K 60 FPS Cut'
  }
};

function initProjectModal() {
  const modal = document.getElementById('mediaModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const backdrop = document.getElementById('modalBackdrop');
  const cards = document.querySelectorAll('.media-card');
  const playReelBtn = document.getElementById('playReelBtn');
  const heroPlayTrigger = document.getElementById('heroPlayTrigger');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  const modalVideoIframe = document.getElementById('modalVideoIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalClient = document.getElementById('modalClient');
  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalDescription = document.getElementById('modalDescription');
  const modalServices = document.getElementById('modalServices');
  const modalMetric = document.getElementById('modalMetric');

  const prevBtn = document.getElementById('prevProjectBtn');
  const nextBtn = document.getElementById('nextProjectBtn');

  const projectIds = Object.keys(PROJECTS_DATA);
  let currentIndex = 0;

  function loadProject(id) {
    const data = PROJECTS_DATA[id];
    if (!data) return;

    currentIndex = projectIds.indexOf(id);

    if (modalVideoIframe) {
      modalVideoIframe.src = data.embedUrl;
    }

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalClient) modalClient.textContent = data.client;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalYear) modalYear.textContent = data.year;
    if (modalDescription) modalDescription.textContent = data.description;
    if (modalMetric) modalMetric.textContent = data.metric;

    if (modalServices) {
      modalServices.innerHTML = '';
      data.services.forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        modalServices.appendChild(li);
      });
    }
  }

  function openModal(id) {
    loadProject(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Stop video/audio immediately by clearing the iframe src
    if (modalVideoIframe) {
      modalVideoIframe.src = '';
    }
  }

  // Click & Enter key event triggers on cards
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      if (id) openModal(id);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = card.getAttribute('data-id');
        if (id) openModal(id);
      }
    });
  });

  // Hero Reel Play Buttons (Defaulting to featured Spokes Digital campaign)
  if (playReelBtn) {
    playReelBtn.addEventListener('click', () => openModal('project-1'));
  }
  if (heroPlayTrigger) {
    heroPlayTrigger.addEventListener('click', () => openModal('project-1'));
  }

  // Modal Inquire Button: close modal and navigate to contact form
  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', (e) => {
      closeModal();
    });
  }

  // Navigation Arrows in Modal
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + projectIds.length) % projectIds.length;
      loadProject(projectIds[currentIndex]);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % projectIds.length;
      loadProject(projectIds[currentIndex]);
    });
  }

  // Close triggers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Keyboard accessibility: Escape to close, arrows to cycle
  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

/* ==========================================================================
   6. Minimal Contact Form & Interaction
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const serviceChips = document.querySelectorAll('#serviceChips .chip');
  const budgetPills = document.querySelectorAll('#budgetPills .budget-pill');
  const submitBtn = document.getElementById('submitBtn');
  const toast = document.getElementById('toastNotification');

  serviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  budgetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      budgetPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const messageInput = document.getElementById('userMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (messageError) messageError.textContent = '';

    let isValid = true;

    if (!nameInput.value.trim()) {
      if (nameError) nameError.textContent = 'Please enter your name.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      if (emailError) emailError.textContent = 'Please provide an email address.';
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      if (emailError) emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      if (messageError) messageError.textContent = 'Please tell me about your project or brief.';
      isValid = false;
    }

    if (!isValid) return;

    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      const firstName = nameInput.value.trim().split(' ')[0];
      form.reset();

      // Reset chips & pills to default state
      serviceChips.forEach((chip, idx) => {
        chip.classList.toggle('active', idx === 0);
      });
      budgetPills.forEach((pill, idx) => {
        pill.classList.toggle('active', idx === 1);
      });

      showToast(
        `Message Sent, ${firstName}!`,
        `Thank you for reaching out. I will review your brief and reply promptly.`
      );
    }, 700);
  });

  function showToast(title, msg) {
    if (!toast) return;
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    if (toastTitle) toastTitle.textContent = title;
    if (toastMessage) toastMessage.textContent = msg;

    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 5000);
  }
}

/* ==========================================================================
   7. Smooth Scroll Navigation Helpers
   ========================================================================== */
function initSmoothScroll() {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash without abrupt jumping
        history.pushState(null, '', targetId);
      }
    });
  });
}
