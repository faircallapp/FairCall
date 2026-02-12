(function () {
  'use strict';

  // ========== Mobile nav toggle ==========
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('is-open');
      document.body.style.overflow = expanded ? '' : 'hidden';
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ========== Lightbox ==========
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox && lightbox.querySelector('.lightbox-img');
  var lightboxCaption = lightbox && lightbox.querySelector('.lightbox-caption');
  var lightboxClose = lightbox && lightbox.querySelector('.lightbox-close');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || '';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.removeAttribute('hidden');
    // Force reflow before adding class for transition
    void lightbox.offsetWidth;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    // Wait for transition then hide
    setTimeout(function () {
      if (!lightbox.classList.contains('is-open')) {
        lightbox.setAttribute('hidden', '');
      }
    }, 300);
  }

  if (lightbox) {
    document.querySelectorAll('.screenshot-link[data-lightbox]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href && /\.(png|jpg|jpeg|webp)$/i.test(href)) {
          e.preventDefault();
          openLightbox(href, link.getAttribute('data-caption') || '');
        }
      });
    });
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // ========== FAQ accordion ==========
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      var target = document.getElementById(btn.getAttribute('aria-controls'));
      if (!target) return;
      btn.setAttribute('aria-expanded', String(!expanded));
      target.classList.toggle('is-open', !expanded);
      target.setAttribute('aria-hidden', String(expanded));
    });
  });

  // ========== Scroll fade-up animations ==========
  if ('IntersectionObserver' in window) {
    var fadeElements = document.querySelectorAll('.fade-up');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ========== Dynamic year ==========
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
