const logger = window.logger || console;

const DEFAULT_PRODUCTS = [
  {
    id: 'pan-flauta',
    name: 'Pan Flauta',
    category: 'Panes',
    description: 'Clásico y fresco, ideal para todos los días.',
    img: 'assets/images/products/pan-flauta.jpg',
    alt: 'Pan flauta'
  },
  {
    id: 'bizcochos',
    name: 'Bizcochos (¼ kg)',
    category: 'Bizcochos',
    description: 'Surtido para acompañar el mate o el café.',
    img: 'assets/images/products/bizcochos.jpg',
    alt: 'Bizcochos surtidos'
  },
  {
    id: 'alfajor-suizo',
    name: 'Alfajor suizo',
    category: 'Pastelería',
    description: 'Dulce, colorido y tentador. Ideal para un antojo.',
    img: 'assets/images/products/alfajor-suizo.jpg',
    alt: 'Alfajores suizos'
  },
  {
    id: 'pasta-frola',
    name: 'Pasta frola',
    category: 'Pastelería',
    description: 'Clásica, ideal para compartir.',
    img: 'assets/images/products/pasta-frola-ddl.jpg',
    alt: 'Pasta frola'
  },
  {
    id: 'empanada-jq',
    name: 'Empanada de jamón y queso',
    category: 'Salados',
    description: 'Rellena y dorada, lista para disfrutar.',
    img: 'assets/images/products/empanada-jamon-queso.jpg',
    alt: 'Empanada de jamón y queso'
  },
  {
    id: 'medialuna-rellena',
    name: 'Medialuna rellena',
    category: 'Salados',
    description: 'Ideal para una colación rápida.',
    img: 'assets/images/products/medialuna-rellena.jpg',
    alt: 'Medialuna rellena'
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    name: 'Carolina M.',
    rating: 5,
    text: 'La mejor medialuna que probé. Siempre fresco y la atención impecable.'
  },
  {
    name: 'Diego R.',
    rating: 5,
    text: 'Encargué para un cumple y la torta llegó perfecta. Sabor espectacular.'
  },
  {
    name: 'Valentina S.',
    rating: 4,
    text: 'Pan de campo increíble. Se nota la fermentación lenta y la calidad.'
  }
];

const DEFAULT_CATEGORIES = [
  {
    id: 'panes',
    name: 'Panes',
    description: 'Frescos todos los días',
    image: 'assets/images/products/pan-flauta.jpg',
    href: null
  },
  {
    id: 'bizcochos',
    name: 'Bizcochos',
    description: 'Para el mate y la sobremesa',
    image: 'assets/images/products/bizcochos.jpg',
    href: null
  },
  {
    id: 'pasteleria',
    name: 'Pastelería',
    description: 'Clásicos y tentaciones',
    image: 'assets/images/products/pasta-frola-ddl.jpg',
    href: null
  },
  {
    id: 'salados',
    name: 'Salados',
    description: 'Listos para llevar',
    image: 'assets/images/products/empanada-jamon-queso.jpg',
    href: null
  },
  {
    id: 'eventos',
    name: 'Lunch & eventos',
    description: 'Para reuniones y celebraciones',
    image: 'assets/images/gallery/vitrina.jpg',
    href: '#eventos'
  },
  {
    id: 'local',
    name: 'Nuestro local',
    description: 'Te esperamos en Morelli',
    image: 'assets/images/gallery/fachada.jpg',
    href: '#ubicacion'
  }
];

function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderStars(rating) {
  const r = Math.max(0, Math.min(5, Number(rating || 0)));
  return Array.from({ length: 5 }).map((_, i) => {
    const filled = i < r;
    return `
      <svg class="w-4 h-4 ${filled ? 'text-amber-500' : 'text-neutral-300'}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.809c-.784-.57-.38-1.81.588-1.81h3.462a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    `;
  }).join('');
}

function mapFeaturedProducts(list) {
  if (!Array.isArray(list) || !list.length) return DEFAULT_PRODUCTS;
  return list
    .filter((p) => p && p.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((p) => ({
      id: p.id || p.name,
      name: p.name || '',
      category: p.category || '',
      description: p.description || '',
      img: p.image || p.img || '',
      alt: p.alt || p.name || ''
    }));
}

function mapTestimonials(list) {
  if (!Array.isArray(list) || !list.length) return DEFAULT_TESTIMONIALS;
  return list
    .filter((t) => t && t.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((t) => ({
      name: t.name || '',
      rating: t.rating || 5,
      text: t.text || ''
    }));
}

function mapFaq(list) {
  const fallback = [
    { q: '¿Cómo hago un pedido?', a: 'Los pedidos se realizan por el catálogo online. Ahí vas a ver productos y opciones disponibles.' },
    { q: '¿Cuál es el horario?', a: 'Martes a domingo de 7:30 a 22:30. Lunes cerrado.' },
    { q: '¿Hacen lunch para eventos?', a: 'Sí. Armamos lunch para eventos y opciones a medida. Consultanos por WhatsApp para coordinar.' },
    { q: '¿Cuándo usar WhatsApp?', a: 'WhatsApp es solo para pedidos especiales, grandes volúmenes o coordinaciones fuera de lo habitual.' }
  ];
  if (!Array.isArray(list) || !list.length) return fallback;
  return list
    .filter((f) => f && f.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((f) => ({ q: f.q || '', a: f.a || '' }))
    .slice(0, 4);
}

function renderSiteBanners({ business, webContent }) {
  const host = document.getElementById('site-banners');
  if (!host) return;

  const hours = business?.hoursDisplay || '';
  const notice = webContent?.banner;
  const parts = [];

  if (hours) {
    parts.push(`<div class="site-top-banner site-top-banner--hours">${escapeHtml(hours)}</div>`);
  }

  if (notice?.enabled && notice.text) {
    const type = ['info', 'warning', 'promo'].includes(notice.type) ? notice.type : 'info';
    parts.push(`<div class="site-top-banner site-top-banner--notice site-top-banner--${type}">${escapeHtml(notice.text)}</div>`);
  }

  host.innerHTML = parts.join('');
}

function buildHero({ business }) {
  const hero = business?.hero || {};
  const title = hero.title || "Panadería Nueva Río D'or";
  const subtitle = hero.subtitle || 'Productos frescos todos los días.';
  const eyebrow = hero.eyebrow || 'Montevideo';

  return `
    <section id="inicio" class="hero-fullbleed">
      <div class="hero-fullbleed__media" aria-hidden="true">
        <img src="assets/images/gallery/fachada.jpg" alt="" loading="eager" decoding="async">
      </div>
      <div class="hero-fullbleed__overlay" aria-hidden="true"></div>
      <div class="hero-fullbleed__content">
        <p class="text-xs sm:text-sm tracking-[0.2em] uppercase text-white/80 mb-3">${escapeHtml(eyebrow)}</p>
        <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance max-w-3xl">
          ${escapeHtml(title)}
        </h1>
        <p class="mt-4 text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
          ${escapeHtml(subtitle)}
        </p>
        <div class="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <a id="hero-catalogo" href="#" target="_blank" rel="noopener" class="btn btn-primary">
            Pedir por catálogo
          </a>
          <a id="hero-pedidosya" href="#" target="_blank" rel="noopener" class="btn-ghost text-white/90 hover:text-white text-sm">
            También en PedidosYa
          </a>
        </div>
      </div>
    </section>
  `;
}

function buildPromos({ business, webContent }) {
  const catalogUrl = business?.catalogUrl || '#';
  const notice = webContent?.banner;
  const firstPromo = (notice?.enabled && notice.text)
    ? {
        title: notice.text,
        body: 'Enterate de novedades y avisos del local.',
        cta: 'Ver catálogo',
        href: catalogUrl,
        image: 'assets/images/gallery/vitrina.jpg',
        external: true
      }
    : {
        title: 'Medialunas recién horneadas',
        body: 'Llevate el sabor de siempre, frescas todos los días.',
        cta: 'Pedir ahora',
        href: catalogUrl,
        image: 'assets/images/products/medialuna-rellena.jpg',
        external: true
      };

  const promos = [
    firstPromo,
    {
      title: 'Pastelería para compartir',
      body: 'Pasta frola, alfajores y clásicos de mostrador.',
      cta: 'Explorar catálogo',
      href: catalogUrl,
      image: 'assets/images/products/pasta-frola-ddl.jpg',
      external: true,
      flip: true
    },
    {
      title: 'Lunch para eventos',
      body: 'Armamos opciones para reuniones, cumpleaños y empresas.',
      cta: 'Ver opciones',
      href: '#eventos',
      image: 'assets/images/gallery/vitrina.jpg',
      external: false
    }
  ];

  return `
    <section class="reveal" aria-label="Promociones">
      ${promos.map((p) => `
        <article class="promo-strip ${p.flip ? 'promo-strip--flip' : ''}">
          <div class="promo-strip__media">
            <img src="${escapeHtml(p.image)}" alt="" loading="lazy" decoding="async">
          </div>
          <div class="promo-strip__body">
            <h2 class="font-display text-3xl sm:text-4xl tracking-tight text-balance">${escapeHtml(p.title)}</h2>
            <p class="text-neutral-600 text-base sm:text-lg max-w-md leading-relaxed">${escapeHtml(p.body)}</p>
            <div>
              <a href="${escapeHtml(p.href)}" ${p.external ? 'target="_blank" rel="noopener"' : ''} class="btn btn-primary">
                ${escapeHtml(p.cta)}
              </a>
            </div>
          </div>
        </article>
      `).join('')}
    </section>
  `;
}

function buildCategories({ business }) {
  const catalogUrl = business?.catalogUrl || '#';
  return `
    <section id="productos" class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 reveal">
      <div class="max-w-2xl mb-10">
        <p class="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">Los destacados</p>
        <h2 class="font-display text-3xl sm:text-4xl tracking-tight">Lo que más pedís</h2>
        <p class="mt-3 text-neutral-600">Elegí una categoría y pedí por el catálogo online.</p>
      </div>
      <div class="category-grid">
        ${DEFAULT_CATEGORIES.map((c) => {
          const href = c.href || catalogUrl;
          const external = !String(href).startsWith('#');
          return `
            <a class="category-tile" href="${escapeHtml(href)}" ${external ? 'target="_blank" rel="noopener"' : ''}>
              <img src="${escapeHtml(c.image)}" alt="${escapeHtml(c.name)}" loading="lazy" decoding="async">
              <div class="category-tile__overlay" aria-hidden="true"></div>
              <div class="category-tile__label">
                <p class="font-display text-2xl tracking-tight">${escapeHtml(c.name)}</p>
                <p class="text-sm text-white/80 mt-1">${escapeHtml(c.description)}</p>
              </div>
            </a>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function buildProductStrip({ products }) {
  if (!products?.length) return '';
  return `
    <section class="border-y border-neutral-200 bg-neutral-50 reveal" aria-label="Productos destacados">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div class="flex items-end justify-between gap-4 mb-6">
          <div>
            <p class="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">Mostrador</p>
            <h2 class="font-display text-2xl sm:text-3xl tracking-tight">Algunos favoritos</h2>
          </div>
        </div>
        <div class="product-strip">
          ${products.map((p) => `
            <article class="product-strip__item">
              <button type="button" class="product-img-btn w-full text-left" data-src="${escapeHtml(p.img)}" data-alt="${escapeHtml(p.alt)}" data-caption="${escapeHtml(p.name)}">
                <img src="${escapeHtml(p.img)}" alt="${escapeHtml(p.alt)}" loading="lazy" decoding="async">
              </button>
              <p class="mt-3 text-xs tracking-[0.14em] uppercase text-neutral-500">${escapeHtml(p.category)}</p>
              <h3 class="font-display text-lg tracking-tight mt-1">${escapeHtml(p.name)}</h3>
              <p class="text-sm text-neutral-600 mt-1 leading-relaxed">${escapeHtml(p.description)}</p>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function buildOrderStrip({ business }) {
  const waDigits = String(business?.whatsappE164 || '').replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent(business?.whatsappMessage || 'Hola! Quiero coordinar un pedido especial.');
  const waLink = waDigits ? `https://wa.me/${waDigits}?text=${waMsg}` : '#';

  return `
    <section id="pedir" class="bg-neutral-900 text-white reveal">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <p class="text-xs tracking-[0.2em] uppercase text-white/60 mb-2">Pedidos online</p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-tight text-balance">Pedí con anticipación y retirás cuando quieras</h2>
          <p class="mt-4 text-white/75 leading-relaxed max-w-lg">
            Para pedidos habituales usá el catálogo online. Si necesitás envío, también estamos en PedidosYa.
          </p>
        </div>
        <div class="space-y-4">
          <a id="pedir-catalogo" href="#" target="_blank" rel="noopener" class="btn btn-primary w-full sm:w-auto">
            Ir al catálogo
          </a>
          <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-sm">
            <a id="pedir-pedidosya" href="#" target="_blank" rel="noopener" class="btn-ghost text-white/85">PedidosYa</a>
            <a id="pedir-whatsapp" href="${escapeHtml(waLink)}" target="_blank" rel="noopener" class="btn-ghost text-white/85">WhatsApp (pedido especial)</a>
          </div>
          <p class="text-xs text-white/50 max-w-md">
            WhatsApp solo para pedidos especiales, grandes volúmenes o coordinaciones fuera de lo habitual.
          </p>
        </div>
      </div>
    </section>
  `;
}

function buildTestimonials({ testimonials }) {
  return `
    <section id="comentarios" class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 reveal">
      <div class="max-w-2xl mb-10">
        <p class="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">Reseñas</p>
        <h2 class="font-display text-3xl sm:text-4xl tracking-tight">Lo que dicen</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        ${testimonials.map((t) => `
          <figure>
            <div class="flex gap-0.5 mb-3" aria-label="${escapeHtml(t.rating)} de 5">${renderStars(t.rating)}</div>
            <blockquote class="text-neutral-700 leading-relaxed">“${escapeHtml(t.text)}”</blockquote>
            <figcaption class="mt-4 font-display text-lg tracking-tight">${escapeHtml(t.name)}</figcaption>
          </figure>
        `).join('')}
      </div>
    </section>
  `;
}

function buildEvents({ business }) {
  const waDigits = String(business?.whatsappE164 || '').replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent('Hola! Quiero consultar por lunch para un evento.');
  const waLink = waDigits ? `https://wa.me/${waDigits}?text=${waMsg}` : '#';

  return `
    <section id="eventos" class="bg-neutral-50 border-y border-neutral-200 reveal">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">Eventos</p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-tight">Lunch a medida</h2>
          <p class="mt-4 text-neutral-600 leading-relaxed max-w-lg">
            Armamos opciones para reuniones, cumpleaños y empresas. Variedad de salados, panificados y dulces.
          </p>
          <ul class="mt-6 space-y-2 text-sm text-neutral-700">
            <li>Para 5, 10 o 15 personas</li>
            <li>Retiro o envío a coordinar</li>
            <li>Consulta por WhatsApp</li>
          </ul>
          <div class="mt-8">
            <a href="${escapeHtml(waLink)}" target="_blank" rel="noopener" class="btn btn-primary">Consultar por WhatsApp</a>
          </div>
        </div>
        <div class="overflow-hidden min-h-[280px]">
          <img src="assets/images/gallery/vitrina.jpg" alt="Vitrina de productos" class="w-full h-full object-cover min-h-[280px]" loading="lazy" decoding="async">
        </div>
      </div>
    </section>
  `;
}

function buildLocation({ business }) {
  const q = encodeURIComponent(business.mapQuery || business.address || '');
  const mapSrc = q ? `https://www.google.com/maps?q=${q}&output=embed` : '';
  const mapLink = q ? `https://www.google.com/maps?q=${q}` : '#';

  return `
    <section id="ubicacion" class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 reveal">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <p class="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">Ubicación</p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-tight">Te esperamos</h2>
          <p class="mt-4 text-neutral-600 leading-relaxed">${escapeHtml(business.address)}</p>
          <p class="mt-2 text-neutral-600">${escapeHtml(business.hoursDisplay || '')}</p>
          <p class="mt-2 text-neutral-600">
            Tel: <a class="hover:text-red-600 underline underline-offset-4" href="tel:${escapeHtml(business.phoneE164)}">${escapeHtml(business.phoneDisplay)}</a>
          </p>
          <div class="mt-8">
            <a href="${escapeHtml(mapLink)}" target="_blank" rel="noopener" class="btn btn-primary">Cómo llegar</a>
          </div>
        </div>
        <div class="overflow-hidden bg-neutral-100 min-h-[280px]">
          ${mapSrc
            ? `<iframe title="Mapa de ubicación" src="${escapeHtml(mapSrc)}" class="w-full h-80" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
            : `<div class="p-6 text-sm text-neutral-600">Mapa no disponible.</div>`}
        </div>
      </div>
    </section>
  `;
}

function buildContact({ business }) {
  return `
    <section id="contacto" class="bg-neutral-50 border-t border-neutral-200 reveal">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p class="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-2">Contacto</p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-tight">Pedido especial</h2>
          <p class="mt-4 text-neutral-600 leading-relaxed max-w-md">
            Este formulario abre WhatsApp y es solo para pedidos especiales o coordinaciones extraordinarias.
            Para pedidos habituales usá el <a id="contacto-catalogo" href="#" target="_blank" rel="noopener" class="underline underline-offset-4 hover:text-red-600">catálogo online</a>.
          </p>
        </div>
        <form id="contact-form" class="space-y-4">
          <div>
            <label class="block text-xs tracking-[0.14em] uppercase text-neutral-500 mb-1.5" for="contact-name">Nombre</label>
            <input id="contact-name" name="name" required autocomplete="name"
              class="w-full px-3 py-2.5 border border-neutral-300 bg-white text-sm focus:border-red-600 focus:outline-none" placeholder="Tu nombre">
          </div>
          <div>
            <label class="block text-xs tracking-[0.14em] uppercase text-neutral-500 mb-1.5" for="contact-message">Mensaje</label>
            <textarea id="contact-message" name="message" required rows="4"
              class="w-full px-3 py-2.5 border border-neutral-300 bg-white text-sm focus:border-red-600 focus:outline-none" placeholder="Contanos qué necesitás"></textarea>
          </div>
          <label class="flex items-start gap-2 text-sm text-neutral-600">
            <input id="contact-confirm" type="checkbox" required class="mt-1 border-neutral-300 text-red-600 focus:ring-red-600">
            <span>Confirmo que es un pedido especial o coordinación extraordinaria.</span>
          </label>
          <button type="submit" class="btn btn-primary">Enviar por WhatsApp</button>
        </form>
      </div>
    </section>
  `;
}

function buildFaq({ faq }) {
  return `
    <section id="faq" class="bg-neutral-50 border-t border-neutral-200 reveal">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div class="max-w-2xl mb-10">
          <p class="text-xs tracking-[0.2em] uppercase text-red-600 font-semibold mb-2">FAQ</p>
          <h2 class="font-display text-3xl sm:text-4xl tracking-tight text-neutral-900">Preguntas frecuentes</h2>
          <p class="mt-3 text-neutral-700 leading-relaxed">Respuestas rápidas para pedir y coordinar con tranquilidad.</p>
        </div>
        <div id="faq-accordion" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${faq.map((it) => `
            <details class="faq-item group bg-white border border-neutral-200 hover:border-red-300 transition-colors p-5">
              <summary class="cursor-pointer font-medium text-neutral-900 tracking-tight flex items-center justify-between gap-3 focus:outline-none">
                <span>${escapeHtml(it.q)}</span>
              </summary>
              <p class="mt-3 text-sm text-neutral-700 leading-relaxed">${escapeHtml(it.a)}</p>
            </details>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function setupReveal() {
  const nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((n) => n.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  nodes.forEach((n) => io.observe(n));
}

function setupProductLightbox({ openLightbox }) {
  document.querySelectorAll('.product-img-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openLightbox?.({
        src: btn.getAttribute('data-src'),
        alt: btn.getAttribute('data-alt'),
        captionText: btn.getAttribute('data-caption')
      });
    });
  });
}

function setupContactForm({ business, showToast }) {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = String(form.querySelector('#contact-name')?.value || '').trim();
    const message = String(form.querySelector('#contact-message')?.value || '').trim();
    const confirmed = !!form.querySelector('#contact-confirm')?.checked;

    if (!name || !message || !confirmed) {
      showToast?.('Completá todos los campos.');
      return;
    }

    const waDigits = String(business.whatsappE164 || '').replace(/[^\d]/g, '');
    if (!waDigits) {
      showToast?.('WhatsApp no configurado.');
      return;
    }

    const text = encodeURIComponent(`Hola! Soy ${name}. Pedido especial / coordinación: ${message}`);
    window.open(`https://wa.me/${waDigits}?text=${text}`, '_blank', 'noopener');
    showToast?.('Abriendo WhatsApp…');
    form.reset();
  });
}

function wireHomeLinks({ business }) {
  const catalogUrl = business?.catalogUrl || '';
  const pedidosYaUrl = business?.pedidosYaUrl || '';

  const set = (id, href, hideIfEmpty = true) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (href) el.setAttribute('href', href);
    else if (hideIfEmpty) el.classList.add('hidden');
  };

  set('hero-catalogo', catalogUrl);
  set('hero-pedidosya', pedidosYaUrl);
  set('pedir-catalogo', catalogUrl);
  set('pedir-pedidosya', pedidosYaUrl);
  set('contacto-catalogo', catalogUrl);
}

export function initializeHome({ business, webContent, showToast, openLightbox }) {
  logger.debug('Initializing home view (Belvedere layout)');

  const container = document.getElementById('view-container');
  if (!container) {
    logger.error('view-container not found');
    return;
  }

  renderSiteBanners({ business, webContent });

  const products = mapFeaturedProducts(webContent?.featuredProducts);
  const testimonials = mapTestimonials(webContent?.testimonials);
  const faq = mapFaq(webContent?.faq);

  container.innerHTML = `
    ${buildHero({ business })}
    ${buildPromos({ business, webContent })}
    ${buildCategories({ business })}
    ${buildProductStrip({ products })}
    ${buildOrderStrip({ business })}
    ${buildTestimonials({ testimonials })}
    ${buildEvents({ business })}
    ${buildLocation({ business })}
    ${buildContact({ business })}
    ${buildFaq({ faq })}
  `;

  wireHomeLinks({ business });
  setupReveal();
  setupProductLightbox({ openLightbox });
  setupContactForm({ business, showToast });
}
