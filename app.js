// Main app controller (ES Module)
const logger = window.logger || console;

import { initializeHome } from './views/home/index.js';

/**
 * EDITA estos datos con los reales del negocio.
 * Mantenerlos aquí permite actualizar toda la web en un solo lugar.
 */
const BUSINESS = {
  name: "Panadería Nueva Río D'or",
  shortName: "Nueva Río D'or",
  // Teléfono fijo
  phoneE164: '+59825053361',
  phoneDisplay: '2505 3361',
  email: 'nriodor@gmail.com',
  address: 'Dr Juan B. Morelli 3475, 11400 Montevideo, Departamento de Montevideo',
  whatsappE164: '+59899646848',
  whatsappDisplay: '+598 99 646 848',
  whatsappMessage: 'Hola! Quiero hacer un pedido. ¿Me comparten el catálogo y precios?',
  catalogUrl: 'https://catalogo.nrdonline.site/',
  pedidosYaUrl: 'https://www.pedidosya.com.uy/restaurantes/montevideo/panaderia-nueva-rio-dor-f259bb10-32bc-4e1d-934b-908a08efcc7c-menu?origin=shop_list',
  // Usado en el iframe de mapa y en el link externo.
  mapQuery: 'Dr Juan B. Morelli 3475, 11400 Montevideo, Uruguay',
  // Horarios (para UI; para SEO se define en index.html JSON-LD)
  hoursDisplay: "Mar–Dom 7:30–22:30 • Lun cerrado",
  tiktokUrl: 'https://www.tiktok.com/@nriodor',
  instagramUrl: 'https://www.instagram.com/nuevariodor/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100091573790662'
};

function setupYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function setHref(id, href) {
  const el = document.getElementById(id);
  if (el) el.setAttribute('href', href);
}

function buildWhatsappLink() {
  const raw = (BUSINESS.whatsappE164 || '').replace(/[^\d]/g, '');
  const msg = encodeURIComponent(BUSINESS.whatsappMessage || '');
  return raw ? `https://wa.me/${raw}?text=${msg}` : '#';
}

function setupBusinessBindings() {
  setText('footer-address', BUSINESS.address);
  setHref('footer-phone', `tel:${BUSINESS.phoneE164}`);
  setText('footer-phone', BUSINESS.phoneDisplay);
  setHref('footer-email', `mailto:${BUSINESS.email}`);
  setText('footer-email', BUSINESS.email);

  // Main CTA (orders) goes to catalog
  const catalogUrl = BUSINESS.catalogUrl || '#';
  setHref('header-catalog', catalogUrl);
  setHref('mobile-catalog', catalogUrl);
  setHref('sticky-catalog', catalogUrl);

  // WhatsApp (consultas)
  const wa = buildWhatsappLink();
  setHref('sticky-whatsapp', wa);

  // PedidosYa (if present)
  setHref('footer-pedidosya', BUSINESS.pedidosYaUrl || '#');
  const py = document.getElementById('footer-pedidosya');
  if (!BUSINESS.pedidosYaUrl) py?.classList.add('hidden');

  // Social links (if present)
  setHref('footer-instagram', BUSINESS.instagramUrl || '#');
  setHref('footer-facebook', BUSINESS.facebookUrl || '#');
  setHref('footer-tiktok', BUSINESS.tiktokUrl || '#');

  ['footer-instagram', 'footer-facebook', 'footer-tiktok'].forEach((id) => {
    const el = document.getElementById(id);
    const href = el?.getAttribute('href') || '';
    if (!href || href === '#') el?.classList.add('hidden');
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-message');
  if (!toast || !msg) return;

  msg.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 2500);
}

function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  const close = () => {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    if (isOpen) close();
    else {
      menu.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Cerrar al click en un link
  menu.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => close());
  });

  // Cerrar con Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function setupActiveNavOnScroll() {
  const links = Array.from(document.querySelectorAll('a.nav-link[href^="#"]'));
  if (!('IntersectionObserver' in window) || links.length === 0) return;

  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const byId = new Map(links.map(a => [a.getAttribute('href'), a]));

  const setActive = (hash) => {
    byId.forEach((a) => {
      a.classList.remove('text-red-700');
      a.classList.add('text-gray-700');
    });
    const a = byId.get(hash);
    if (a) {
      a.classList.add('text-red-700');
      a.classList.remove('text-gray-700');
    }
  };

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) {
      setActive('#' + visible.target.id);
    }
  }, { root: null, threshold: [0.25, 0.5, 0.75] });

  sections.forEach(s => io.observe(s));
}

function setupLightbox() {
  const root = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  if (!root || !img || !caption || !closeBtn) return;

  const close = () => {
    root.classList.add('hidden');
    root.classList.remove('flex');
    img.setAttribute('src', '');
    img.setAttribute('alt', '');
    caption.textContent = '';
  };

  closeBtn.addEventListener('click', close);
  root.addEventListener('click', (e) => {
    if (e.target === root) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  window.NRDWeb = window.NRDWeb || {};
  window.NRDWeb.openLightbox = ({ src, alt, captionText }) => {
    img.setAttribute('src', src);
    img.setAttribute('alt', alt || '');
    caption.textContent = captionText || '';
    root.classList.remove('hidden');
    root.classList.add('flex');
    closeBtn.focus?.();
  };
}

function setupSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });
}

function main() {
  logger.info("Initializing Panadería Nueva Río D'or");

  setupYear();
  setupBusinessBindings();
  setupMobileMenu();
  setupSmoothAnchors();
  setupActiveNavOnScroll();
  setupLightbox();

  initializeHome({
    business: BUSINESS,
    showToast,
    openLightbox: (payload) => window.NRDWeb?.openLightbox?.(payload)
  });
}

main();

