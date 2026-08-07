// Main app controller (ES Module)
const logger = window.logger || console;

import { initializeHome } from './views/home/index.js';
import { fetchWebContent } from './modules/web-api.js';

/**
 * Defaults locales. Se sobrescriben con GET /web cuando la API responde.
 */
const BUSINESS_DEFAULTS = {
  name: "Panadería Nueva Río D'or",
  shortName: "Nueva Río D'or",
  phoneE164: '+59825053361',
  phoneDisplay: '2505 3361',
  email: 'nriodor@gmail.com',
  address: 'Dr Juan B. Morelli 3475, 11400 Montevideo, Departamento de Montevideo',
  whatsappE164: '+59899646848',
  whatsappDisplay: '+598 99 646 848',
  whatsappMessage: 'Hola! Quiero coordinar un pedido especial (gran volumen / evento).',
  catalogUrl: 'https://catalogo.nrdonline.site/',
  pedidosYaUrl: 'https://www.pedidosya.com.uy/restaurantes/montevideo/panaderia-nueva-rio-dor-f259bb10-32bc-4e1d-934b-908a08efcc7c-menu?origin=shop_list',
  mapQuery: 'Dr Juan B. Morelli 3475, 11400 Montevideo, Uruguay',
  hoursDisplay: 'Mar–Dom 7:30–22:30 • Lun cerrado',
  tiktokUrl: 'https://www.tiktok.com/@nriodor',
  instagramUrl: 'https://www.instagram.com/nuevariodor/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100091573790662',
  hero: {
    eyebrow: 'Montevideo',
    title: "Panadería Nueva Río D'or",
    subtitle: 'Productos frescos todos los días. Pedí por nuestro catálogo online o por PedidosYa.'
  }
};

let BUSINESS = { ...BUSINESS_DEFAULTS, hero: { ...BUSINESS_DEFAULTS.hero } };

function applyWebContent(web) {
  if (!web || typeof web !== 'object') return;

  if (web.hoursDisplay) BUSINESS.hoursDisplay = String(web.hoursDisplay);

  const links = web.links && typeof web.links === 'object' ? web.links : {};
  if (links.catalogUrl) BUSINESS.catalogUrl = String(links.catalogUrl);
  if (links.pedidosYaUrl) BUSINESS.pedidosYaUrl = String(links.pedidosYaUrl);
  if (links.instagramUrl) BUSINESS.instagramUrl = String(links.instagramUrl);
  if (links.facebookUrl) BUSINESS.facebookUrl = String(links.facebookUrl);
  if (links.tiktokUrl) BUSINESS.tiktokUrl = String(links.tiktokUrl);

  const wa = web.whatsapp && typeof web.whatsapp === 'object' ? web.whatsapp : {};
  if (wa.e164) BUSINESS.whatsappE164 = String(wa.e164);
  if (wa.display) BUSINESS.whatsappDisplay = String(wa.display);
  if (wa.message) BUSINESS.whatsappMessage = String(wa.message);

  const hero = web.hero && typeof web.hero === 'object' ? web.hero : {};
  BUSINESS.hero = {
    eyebrow: hero.eyebrow != null && String(hero.eyebrow).trim() ? String(hero.eyebrow) : BUSINESS.hero.eyebrow,
    title: hero.title != null && String(hero.title).trim() ? String(hero.title) : BUSINESS.hero.title,
    subtitle: hero.subtitle != null && String(hero.subtitle).trim() ? String(hero.subtitle) : BUSINESS.hero.subtitle
  };
}

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

function buildMapsLink() {
  const q = encodeURIComponent(BUSINESS.mapQuery || BUSINESS.address || '');
  return q ? `https://www.google.com/maps?q=${q}` : '#';
}

function setupBusinessBindings() {
  setText('footer-address', BUSINESS.address);
  setText('footer-hours', BUSINESS.hoursDisplay || '—');
  setHref('footer-phone', `tel:${BUSINESS.phoneE164}`);
  setText('footer-phone', BUSINESS.phoneDisplay);
  setHref('footer-email', `mailto:${BUSINESS.email}`);
  setText('footer-email', BUSINESS.email);
  setHref('footer-maps', buildMapsLink());

  const catalogUrl = BUSINESS.catalogUrl || '#';
  setHref('header-catalog', catalogUrl);
  setHref('mobile-catalog', catalogUrl);
  setHref('footer-catalog', catalogUrl);

  const wa = buildWhatsappLink();
  setHref('floating-whatsapp', wa);
  setHref('mobile-whatsapp-special', wa);

  setHref('footer-pedidosya', BUSINESS.pedidosYaUrl || '#');
  const py = document.getElementById('footer-pedidosya');
  if (!BUSINESS.pedidosYaUrl) py?.classList.add('hidden');
  setHref('mobile-pedidosya', BUSINESS.pedidosYaUrl || '#');

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

  menu.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => close());
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function setupActiveNavOnScroll() {
  const links = Array.from(document.querySelectorAll('a.nav-link[href^="#"]'));
  if (!('IntersectionObserver' in window) || links.length === 0) return;

  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const byId = new Map(links.map((a) => [a.getAttribute('href'), a]));

  const setActive = (hash) => {
    byId.forEach((a) => {
      a.classList.remove('text-red-600');
    });
    const a = byId.get(hash);
    if (a) a.classList.add('text-red-600');
  };

  const io = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) {
      setActive('#' + visible.target.id);
    }
  }, { root: null, threshold: [0.2, 0.4, 0.6] });

  sections.forEach((s) => io.observe(s));
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
  document.addEventListener('click', (e) => {
    const a = e.target?.closest?.('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', href);
  });
}

async function main() {
  logger.info("Initializing Panadería Nueva Río D'or");

  let webContent = null;
  try {
    webContent = await fetchWebContent();
    applyWebContent(webContent);
    logger.info('Web content loaded from API');
  } catch (error) {
    logger.warn('Using local defaults (GET /web failed)', error);
  }

  setupYear();
  setupBusinessBindings();
  setupMobileMenu();
  setupSmoothAnchors();
  setupLightbox();

  initializeHome({
    business: BUSINESS,
    webContent,
    showToast,
    openLightbox: (payload) => window.NRDWeb?.openLightbox?.(payload)
  });

  // Nav observer after sections exist in DOM
  setupActiveNavOnScroll();
}

main();
