/* ============================================
   InternNova Homepage Redesign - JavaScript
   Designer: Jeet Dey
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // PRELOADER
  // ==========================================
  const preloader = document.getElementById('preloader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      // Start animations after preloader is done
      initScrollReveal();
    }, 1600);
  });

  // Fallback: hide preloader if load event already fired
  if (document.readyState === 'complete') {
    setTimeout(() => {
      preloader.classList.add('hidden');
      initScrollReveal();
    }, 1600);
  }

  // ==========================================
  // NAVBAR - Scroll Effect
  // ==========================================
  const navbar = document.getElementById('navbar');
  
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll(); // Call once on load

  // ==========================================
  // MOBILE MENU
  // ==========================================
  const navHamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');
  const navActions = document.getElementById('navActions');

  navHamburger.addEventListener('click', () => {
    navHamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navActions.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navHamburger.classList.remove('active');
      navLinks.classList.remove('active');
      navActions.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ==========================================
  // HERO PARTICLES
  // ==========================================
  const heroParticles = document.getElementById('heroParticles');
  
  if (heroParticles) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
      particle.style.width = (Math.random() * 3 + 1) + 'px';
      particle.style.height = particle.style.width;
      
      const colors = ['#6366f1', '#06b6d4', '#8b5cf6', '#10b981', '#818cf8'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      heroParticles.appendChild(particle);
    }
  }

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const counters = document.querySelectorAll('[data-target]');
  const counterAnimated = new Set();

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;

    const update = () => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString() + suffix;
        return;
      }
      el.textContent = current.toLocaleString() + suffix;
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counterAnimated.has(entry.target)) {
        counterAnimated.add(entry.target);
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ==========================================
  // SCROLL REVEAL ANIMATIONS
  // ==========================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply transition delay if it has one defined via style attribute
          const delay = entry.target.style.transitionDelay;
          if (delay) {
            setTimeout(() => {
              entry.target.classList.add('active');
            }, parseFloat(delay) * 1000);
          } else {
            entry.target.classList.add('active');
          }
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const answerContent = item.querySelector('.faq-answer-content');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked item (if it wasn't already open)
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answerContent.scrollHeight + 24 + 'px';
      }
    });
  });

  // Set first FAQ item open by default
  const firstFaq = document.querySelector('.faq-item.active');
  if (firstFaq) {
    const firstAnswer = firstFaq.querySelector('.faq-answer');
    const firstContent = firstFaq.querySelector('.faq-answer-content');
    firstAnswer.style.maxHeight = firstContent.scrollHeight + 24 + 'px';
  }

  // ==========================================
  // SCROLL TO TOP BUTTON
  // ==========================================
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // ACTIVE NAV LINK ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      
      if (navLink && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.style.color = '';
        });
        navLink.style.color = 'var(--primary-400)';
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);

  // ==========================================
  // TILT EFFECT ON CARDS (subtle)
  // ==========================================
  const tiltCards = document.querySelectorAll('.program-card, .why-card, .testimonial-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 30;
      const rotateY = (centerX - x) / 30;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================
  // TYPING EFFECT FOR HERO (optional enhancement)
  // ==========================================
  // The gradient animation already provides visual interest

  // ==========================================
  // HANDLE TICKER PAUSE ON HOVER
  // ==========================================
  const tickerTrack = document.querySelector('.ticker-track');
  
  if (tickerTrack) {
    tickerTrack.addEventListener('mouseenter', () => {
      tickerTrack.style.animationPlayState = 'paused';
    });
    
    tickerTrack.addEventListener('mouseleave', () => {
      tickerTrack.style.animationPlayState = 'running';
    });
  }

  // ==========================================
  // PARALLAX EFFECT ON HERO
  // ==========================================
  const heroBg = document.querySelector('.hero-bg img');
  
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
      }
    });
  }

  // ==========================================
  // INITIALIZE
  // ==========================================
  console.log('🚀 InternNova Homepage Redesign — Designed by Jeet Dey');

});
