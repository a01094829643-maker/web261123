/* main.js — Entry point: navbar, scroll-reveal, guide tabs, FAQ */
import { initShapes } from './shapes.js';
import { initStepper } from './stepper.js';
import { initEuler   } from './euler.js';

/* ── Navbar scroll effect ───────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // hamburger mobile menu
  const hamburger = document.querySelector('.nav-hamburger');
  const links     = document.querySelector('.nav-links');
  if (hamburger && links) {
    hamburger.addEventListener('click', () => {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '64px';
      links.style.right = '24px';
      links.style.background = '#fff';
      links.style.padding = '12px';
      links.style.borderRadius = '12px';
      links.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
      links.style.zIndex = '999';
    });
  }
}

/* ── Smooth scroll anchors ──────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const el = document.querySelector(a.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Intersection observer (scroll reveal) ──── */
function initReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ── Guide tabs ─────────────────────────────── */
function initGuideTabs() {
  const tabs   = document.querySelectorAll('.guide-tab');
  const panels = document.querySelectorAll('.guide-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('guide-' + tab.dataset.guide);
      if (target) target.classList.add('active');
    });
  });
}

/* ── FAQ accordion ──────────────────────────── */
function initFaq() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── Animated counters (stats bar) ─────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const end = parseInt(el.dataset.count, 10);
      const dur = 1200;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const prog    = Math.min(elapsed / dur, 1);
        const ease    = 1 - Math.pow(1 - prog, 3); // ease-out cubic
        el.textContent = Math.round(ease * end);
        if (prog < 1) requestAnimationFrame(tick);
        else el.textContent = end;
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
}

/* ── Typing effect (hero title highlight) ───── */
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const words = ['3D 입체도형', '정육면체', '원기둥', '각뿔'];
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 60 : 90);
  }
  tick();
}

/* ── Boot ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSmoothScroll();
  initReveal();
  initGuideTabs();
  initFaq();
  initCounters();
  initTyping();
  initShapes();
  initStepper();
  initEuler();
});
