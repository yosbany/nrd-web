const logger = window.logger || console;

const DEFAULT_PRODUCTS = [
  {
    id: 'pan-flauta',
    name: 'Pan Flauta',
    category: 'Panes',
    price: null,
    unit: null,
    description: 'Clásico y fresco, ideal para todos los días.',
    img: 'assets/images/products/pan-flauta.jpg',
    alt: 'Pan flauta'
  },
  {
    id: 'bizcochos',
    name: 'Bizcochos (¼ kg)',
    category: 'Bizcochos',
    price: null,
    unit: null,
    description: 'Surtido para acompañar el mate o el café.',
    img: 'assets/images/products/bizcochos.jpg',
    alt: 'Bizcochos surtidos'
  },
  {
    id: 'alfajor-suizo',
    name: 'Alfajor suizo',
    category: 'Pastelería',
    price: null,
    unit: null,
    description: 'Dulce, colorido y tentador. Ideal para un antojo.',
    img: 'assets/images/products/alfajor-suizo.jpg',
    alt: 'Alfajores suizos'
  },
  {
    id: 'pasta-frola',
    name: 'Pasta frola',
    category: 'Pastelería',
    price: null,
    unit: null,
    description: 'Clásica, ideal para compartir.',
    img: 'assets/images/products/pasta-frola-ddl.jpg',
    alt: 'Pasta frola'
  },
  {
    id: 'empanada-jq',
    name: 'Empanada de jamón y queso',
    category: 'Salados',
    price: null,
    unit: null,
    description: 'Rellena y dorada, lista para disfrutar.',
    img: 'assets/images/products/empanada-jamon-queso.jpg',
    alt: 'Empanada de jamón y queso'
  },
  {
    id: 'medialuna-rellena',
    name: 'Medialuna rellena',
    category: 'Salados',
    price: null,
    unit: null,
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

const DEFAULT_GALLERY = [
  { src: 'assets/images/gallery/fachada.jpg', alt: "Fachada Panadería Nueva Río D'or", caption: 'Fachada' },
  { src: 'assets/images/gallery/vitrina.jpg', alt: 'Vitrina con panes y productos', caption: 'Vitrina' },
  { src: 'assets/images/products/bizcochos.jpg', alt: 'Bizcochos surtidos', caption: 'Bizcochos' },
  { src: 'assets/images/products/pan-flauta.jpg', alt: 'Pan flauta', caption: 'Pan flauta' },
  { src: 'assets/images/products/alfajor-suizo.jpg', alt: 'Alfajores suizos', caption: 'Alfajor suizo' },
  { src: 'assets/images/products/pasta-frola-ddl.jpg', alt: 'Pasta frola', caption: 'Pasta frola' }
];

function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function formatMoneyUYU(n) {
  const num = Math.round(Number(n || 0));
  return '$' + String(num).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function renderStars(rating) {
  const r = Math.max(0, Math.min(5, Number(rating || 0)));
  return Array.from({ length: 5 }).map((_, i) => {
    const filled = i < r;
    return `
      <svg class="w-4 h-4 ${filled ? 'text-yellow-500' : 'text-gray-300'}" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.809c-.784-.57-.38-1.81.588-1.81h3.462a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    `;
  }).join('');
}

function buildHero({ business }) {
  return `
    <section id="inicio" class="relative overflow-hidden">
      <div class="hero-bg absolute inset-0" aria-hidden="true"></div>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 relative">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div class="space-y-5">
            <p class="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-red-700 bg-red-50 border border-red-100 px-3 py-1">
              <span class="w-2 h-2 bg-red-600"></span>
              Pedidos habituales: catálogo online o PedidosYa
            </p>
            <h1 class="text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              Panadería artesanal en Montevideo
            </h1>
            <p class="text-gray-600 text-base sm:text-lg max-w-xl">
              Productos frescos todos los días. Pedí por nuestro catálogo online o por PedidosYa.
            </p>

            <div class="flex flex-col sm:flex-row gap-3">
              <a id="hero-catalogo" href="#" target="_blank" rel="noopener"
                class="btn px-5 py-3 bg-red-600 text-white border border-red-600 hover:bg-red-700 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
                Pedir por catálogo online
              </a>
              <a id="hero-pedidosya" href="#" target="_blank" rel="noopener"
                class="btn px-5 py-3 bg-white text-gray-900 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
                Pedir por PedidosYa
              </a>
            </div>

            <p class="text-sm text-gray-600 max-w-xl">
              <strong class="font-semibold text-gray-900">Pedido especial por WhatsApp:</strong>
              para pedidos especiales, grandes volúmenes o coordinaciones fuera de lo habitual.
              <a id="hero-whatsapp-special" href="#" target="_blank" rel="noopener" class="text-green-700 hover:text-green-800 underline underline-offset-4">
                Escribir por WhatsApp
              </a>
            </p>

            <dl class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div class="border border-gray-200 bg-white/80 p-4">
                <dt class="text-xs uppercase tracking-wider text-gray-600">Calidad</dt>
                <dd class="mt-1 text-sm text-gray-800">Ingredientes seleccionados</dd>
              </div>
              <div class="border border-gray-200 bg-white/80 p-4">
                <dt class="text-xs uppercase tracking-wider text-gray-600">Frescura</dt>
                <dd class="mt-1 text-sm text-gray-800">Horneado diario</dd>
              </div>
              <div class="border border-gray-200 bg-white/80 p-4">
                <dt class="text-xs uppercase tracking-wider text-gray-600">Pedidos</dt>
                <dd class="mt-1 text-sm text-gray-800">Retiro / envío a coordinar</dd>
              </div>
            </dl>
          </div>

          <div class="relative">
            <div class="border border-gray-200 bg-white p-4 sm:p-6 shadow-soft">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-xs uppercase tracking-wider text-gray-600">Especial del día</p>
                  <p class="text-xl font-semibold tracking-tight">Croissant mantecoso</p>
                  <p class="text-sm text-gray-600 mt-1">Laminado clásico, dorado y liviano.</p>
                </div>
                <span class="text-xs px-2 py-1 bg-green-50 text-green-700 border border-green-100 uppercase tracking-wider">Disponible</span>
              </div>
              <div class="mt-5 grid grid-cols-3 gap-3">
                ${DEFAULT_GALLERY.slice(0, 3).map((g) => `
                  <button class="gallery-btn group border border-gray-200 bg-white overflow-hidden" data-src="${escapeHtml(g.src)}" data-alt="${escapeHtml(g.alt)}" data-caption="${escapeHtml(g.caption)}" aria-label="Abrir foto: ${escapeHtml(g.caption)}">
                    <img class="w-full aspect-[4/3] object-cover group-hover:opacity-90" src="${escapeHtml(g.src)}" alt="${escapeHtml(g.alt)}" loading="lazy" decoding="async">
                  </button>
                `).join('')}
              </div>
              <div class="mt-5 flex items-center justify-between">
                <p class="text-sm text-gray-600">Horario</p>
                <p class="text-sm text-gray-900 font-medium">${escapeHtml(business.hoursDisplay || '')}</p>
              </div>
              <div class="mt-2 flex items-center justify-between">
                <p class="text-sm text-gray-600">Ubicación</p>
                <p class="text-sm text-gray-900 font-medium truncate max-w-[18rem]">${escapeHtml(business.address)}</p>
              </div>
            </div>
            <div class="absolute -z-10 -bottom-6 -right-6 w-56 h-56 bg-red-100 border border-red-200"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildHowToOrder({ business }) {
  const waDigits = String(business.whatsappE164 || '').replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent('Hola! Quiero coordinar un pedido especial (gran volumen / evento).');
  const waLink = waDigits ? `https://wa.me/${waDigits}?text=${waMsg}` : '#';
  const catalogUrl = business?.catalogUrl || '#';
  const pedidosYaUrl = business?.pedidosYaUrl || '';

  return `
    <section id="como-pedir" class="bg-white border-y border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-wider text-gray-600">Cómo pedir</p>
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Elegí el canal según tu pedido</h2>
          <p class="text-gray-600 max-w-2xl">
            Para evitar confusión y responder más rápido, te guiamos al canal correcto.
          </p>
        </div>

        <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="card p-5 space-y-2">
            <p class="text-xs uppercase tracking-wider text-gray-600">Habitual</p>
            <p class="font-semibold tracking-tight">Catálogo online</p>
            <p class="text-sm text-gray-600">Pedidos habituales: ver opciones y pedir.</p>
            <a href="${escapeHtml(catalogUrl)}" target="_blank" rel="noopener"
              class="btn w-full mt-2 px-4 py-2 bg-red-600 text-white border border-red-600 hover:bg-red-700 transition-colors uppercase tracking-wider text-xs font-light">
              Pedir por catálogo
            </a>
          </div>

          <div class="card p-5 space-y-2">
            <p class="text-xs uppercase tracking-wider text-gray-600">Envíos</p>
            <p class="font-semibold tracking-tight">PedidosYa</p>
            <p class="text-sm text-gray-600">Ideal si querés envío a domicilio.</p>
            ${pedidosYaUrl ? `
              <a href="${escapeHtml(pedidosYaUrl)}" target="_blank" rel="noopener"
                class="btn w-full mt-2 px-4 py-2 bg-white text-gray-900 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors uppercase tracking-wider text-xs font-light">
                Pedir por PedidosYa
              </a>
            ` : `
              <p class="text-sm text-gray-500">TODO: agregar link de PedidosYa</p>
            `}
          </div>

          <div class="card p-5 space-y-2 bg-gray-50">
            <p class="text-xs uppercase tracking-wider text-gray-600">Extraordinario</p>
            <p class="font-semibold tracking-tight">WhatsApp (pedido especial)</p>
            <p class="text-sm text-gray-600">
              Solo para pedidos especiales, grandes volúmenes o coordinaciones fuera de lo habitual.
            </p>
            <a href="${escapeHtml(waLink)}" target="_blank" rel="noopener"
              class="btn w-full mt-2 px-4 py-2 border border-gray-300 hover:border-green-700 hover:text-green-800 transition-colors uppercase tracking-wider text-xs font-light">
              Pedido especial por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildProducts({ products }) {
  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  return `
    <section id="productos" class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-wider text-gray-600">Catálogo</p>
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Productos destacados</h2>
          <p class="text-gray-600 max-w-2xl">Una selección para que veas el estilo. Podés ampliar el catálogo o conectar la data a tu sistema cuando quieras.</p>
        </div>
        <div class="w-full md:w-auto">
          <label class="sr-only" for="product-search">Buscar productos</label>
          <input id="product-search" type="search" placeholder="Buscar (ej: pan, torta, croissant)"
            class="w-full md:w-80 px-3 py-2 border border-gray-300 focus:outline-none focus:border-red-600 bg-white text-sm rounded">
        </div>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        ${categories.map((c, idx) => `
          <button class="product-filter-btn px-3 py-1.5 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors text-xs uppercase tracking-wider font-light ${idx === 0 ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white text-gray-700'}"
            data-category="${escapeHtml(c)}">
            ${escapeHtml(c)}
          </button>
        `).join('')}
      </div>

      <div id="products-grid" class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        ${products.map(p => `
          <article class="product-card border border-gray-200 bg-white overflow-hidden hover:border-red-300 transition-colors" data-category="${escapeHtml(p.category)}" data-name="${escapeHtml(p.name)}">
            <button class="product-img-btn w-full text-left" data-src="${escapeHtml(p.img)}" data-alt="${escapeHtml(p.alt)}" data-caption="${escapeHtml(p.name)}">
              <img src="${escapeHtml(p.img)}" alt="${escapeHtml(p.alt)}" class="w-full h-44 object-cover bg-gray-50" loading="lazy" decoding="async">
            </button>
            <div class="p-4 space-y-2">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <h3 class="font-semibold tracking-tight truncate">${escapeHtml(p.name)}</h3>
                  <p class="text-xs uppercase tracking-wider text-gray-600">${escapeHtml(p.category)}</p>
                </div>
                ${p.price != null ? `
                  <p class="text-sm font-semibold text-gray-900 whitespace-nowrap">${formatMoneyUYU(p.price)} ${p.unit ? `<span class="text-gray-500 font-normal">/${escapeHtml(p.unit)}</span>` : ''}</p>
                ` : `
                  <span class="text-xs px-2 py-1 bg-gray-50 text-gray-700 border border-gray-200 uppercase tracking-wider">Consultá</span>
                `}
              </div>
              <p class="text-sm text-gray-600">${escapeHtml(p.description)}</p>
              <div class="pt-2 flex items-center justify-between gap-2">
                <span class="text-xs px-2 py-1 bg-gray-50 text-gray-700 border border-gray-200 uppercase tracking-wider">Hecho hoy</span>
                <a href="#productos" class="text-xs uppercase tracking-wider text-red-700 hover:text-red-800">Ver más</a>
              </div>
            </div>
          </article>
        `).join('')}
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <a id="catalogo-online-btn" href="#" target="_blank" rel="noopener" class="px-5 py-3 bg-gray-900 text-white border border-gray-900 hover:bg-black transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
          Hacer pedido en el catálogo
        </a>
        <a href="#contacto" class="px-5 py-3 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
          Consultas y contacto
        </a>
      </div>
      <p class="mt-4 text-center text-sm text-gray-600">
        Si no encontrás lo que buscás en el catálogo, escribinos por WhatsApp por otros productos.
        <span class="text-gray-900 font-medium">También tenemos lunch para eventos.</span>
      </p>

      <p id="products-empty" class="mt-6 text-center text-sm text-gray-600 hidden">No hay productos que coincidan con tu búsqueda.</p>
    </section>
  `;
}

function buildGallery({ gallery }) {
  return `
    <section id="galeria" class="bg-gray-50 border-y border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-wider text-gray-600">Fotos</p>
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Una mirada al día a día</h2>
          <p class="text-gray-600 max-w-2xl">Imágenes que muestran frescura, detalle y el estilo del local.</p>
        </div>

        <div class="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          ${gallery.map((g) => `
            <button class="gallery-btn group border border-gray-200 bg-white overflow-hidden" data-src="${escapeHtml(g.src)}" data-alt="${escapeHtml(g.alt)}" data-caption="${escapeHtml(g.caption)}" aria-label="Abrir foto: ${escapeHtml(g.caption)}">
              <img src="${escapeHtml(g.src)}" alt="${escapeHtml(g.alt)}" class="w-full aspect-[4/3] object-cover group-hover:opacity-90 bg-gray-50" loading="lazy" decoding="async">
              <div class="px-3 py-2 text-left text-xs uppercase tracking-wider text-gray-600 border-t border-gray-200">${escapeHtml(g.caption)}</div>
            </button>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function buildTestimonials({ testimonials }) {
  return `
    <section id="comentarios" class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="space-y-2">
        <p class="text-xs uppercase tracking-wider text-gray-600">Reseñas</p>
        <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Lo que dicen nuestros clientes</h2>
        <p class="text-gray-600 max-w-2xl">Destacamos algunos comentarios reales (podés reemplazarlos por Google Reviews cuando quieras).</p>
      </div>

      <div class="mt-6 relative">
        <div class="hidden md:flex items-center justify-end gap-2 mb-3">
          <button type="button" id="testimonials-prev" class="btn w-10 h-10 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors" aria-label="Reseñas anteriores">‹</button>
          <button type="button" id="testimonials-next" class="btn w-10 h-10 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors" aria-label="Reseñas siguientes">›</button>
        </div>
        <div id="testimonials-track" class="flex gap-4 overflow-x-auto pb-2 snap-x scroll-smooth">
          ${testimonials.map(t => `
            <figure class="snap-start card p-5 min-w-[85%] sm:min-w-[60%] md:min-w-[32%]">
              <div class="flex items-center gap-1" aria-label="Calificación ${escapeHtml(t.rating)} de 5">
                ${renderStars(t.rating)}
              </div>
              <blockquote class="mt-3 text-sm text-gray-700">“${escapeHtml(t.text)}”</blockquote>
              <figcaption class="mt-4 text-xs uppercase tracking-wider text-gray-600">${escapeHtml(t.name)}</figcaption>
            </figure>
          `).join('')}
        </div>
        <p class="mt-3 text-xs text-gray-500">Tip: deslizá horizontalmente para ver más reseñas.</p>
      </div>
    </section>
  `;
}

function buildEvents({ business }) {
  return `
    <section id="eventos" class="bg-gray-50 border-y border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div class="space-y-3">
          <p class="text-xs uppercase tracking-wider text-gray-600">Eventos</p>
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Lunch para eventos</h2>
          <p class="text-gray-600">
            Armamos opciones para reuniones, cumpleaños y empresas. Tenemos ofertas para <strong class="font-semibold text-gray-900">5, 10 y 15 personas</strong>.
            Si no encontrás lo que buscás, escribinos por WhatsApp y lo coordinamos.
          </p>

          <ul class="mt-3 space-y-2 text-sm text-gray-700">
            <li class="flex gap-2"><span class="text-red-700">—</span><span><strong class="font-semibold">Variedad:</strong> salados + panificados + dulces</span></li>
            <li class="flex gap-2"><span class="text-red-700">—</span><span><strong class="font-semibold">Cantidad:</strong> para grupos chicos o grandes</span></li>
            <li class="flex gap-2"><span class="text-red-700">—</span><span><strong class="font-semibold">Coordinación:</strong> retiro o envío (a coordinar)</span></li>
          </ul>

          <div class="pt-2 flex flex-col sm:flex-row gap-3">
            <a href="${escapeHtml(business?.catalogUrl || '#')}" target="_blank" rel="noopener"
              class="px-5 py-3 bg-red-600 text-white border border-red-600 hover:bg-red-700 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
              Ver catálogo (pedido)
            </a>
            <a href="#contacto"
              class="px-5 py-3 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
              Consultar por lunch
            </a>
          </div>
        </div>

        <div class="border border-gray-200 bg-white p-5 space-y-3">
          <p class="text-xs uppercase tracking-wider text-gray-600">Ofertas por cantidad</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div class="border border-gray-200 p-4">
              <p class="font-semibold">Para 5 personas</p>
              <ul class="mt-2 space-y-1 text-gray-600">
                <li>— Mix salado (ej: empanaditas / bocaditos)</li>
                <li>— Panificados</li>
                <li>— Opción dulce</li>
              </ul>
            </div>
            <div class="border border-gray-200 p-4">
              <p class="font-semibold">Para 10 personas</p>
              <ul class="mt-2 space-y-1 text-gray-600">
                <li>— Mix salado + refuerzos</li>
                <li>— Panificados</li>
                <li>— Opción dulce surtida</li>
              </ul>
            </div>
            <div class="border border-gray-200 p-4">
              <p class="font-semibold">Para 15 personas</p>
              <ul class="mt-2 space-y-1 text-gray-600">
                <li>— Mix salado completo</li>
                <li>— Panificados</li>
                <li>— Dulce + salado (mixto)</li>
              </ul>
            </div>
          </div>
          <p class="text-xs text-gray-500">
            Nota: los pedidos se realizan por catálogo. Para opciones especiales, consultanos por WhatsApp.
          </p>
        </div>
      </div>
    </section>
  `;
}

function buildFaq() {
  const items = [
    {
      q: '¿Cómo hago un pedido?',
      a: 'Los pedidos se realizan por el catálogo online. Ahí vas a ver productos y opciones disponibles.'
    },
    {
      q: '¿Y si no encuentro lo que busco en el catálogo?',
      a: 'Escribinos por WhatsApp y te ayudamos con otros productos u opciones especiales.'
    },
    {
      q: '¿Hacen lunch para eventos?',
      a: 'Sí. Armamos lunch para eventos y opciones a medida. Consultanos por WhatsApp para coordinar.'
    },
    {
      q: '¿Cuál es el horario?',
      a: 'Martes a domingo de 7:30 a 22:30. Lunes cerrado.'
    },
    {
      q: '¿Dónde están ubicados?',
      a: "Dr Juan B. Morelli 3475, 11400 Montevideo, Departamento de Montevideo."
    },
    {
      q: '¿También están en PedidosYa?',
      a: 'Sí, también podés encontrarnos en PedidosYa.'
    },
    {
      q: '¿Cuándo usar WhatsApp para pedir?',
      a: 'WhatsApp es solo para pedidos especiales, grandes volúmenes o coordinaciones fuera de lo habitual. Para pedidos habituales, usá el catálogo online o PedidosYa.'
    }
  ];

  return `
    <section id="faq" class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="space-y-2">
        <p class="text-xs uppercase tracking-wider text-gray-600">FAQ</p>
        <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Preguntas frecuentes</h2>
        <p class="text-gray-600 max-w-2xl">Respuestas rápidas para ayudarte a pedir y coordinar.</p>
      </div>

      <div id="faq-accordion" class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        ${items.map((it) => `
          <details class="faq-item card p-4">
            <summary class="cursor-pointer font-semibold tracking-tight flex items-center justify-between gap-3 focus:outline-none">
              <span>${escapeHtml(it.q)}</span>
            </summary>
            <p class="mt-2 text-sm text-gray-600">${escapeHtml(it.a)}</p>
          </details>
        `).join('')}
      </div>
    </section>
  `;
}

function buildLocation({ business }) {
  const q = encodeURIComponent(business.mapQuery || business.address || '');
  const mapSrc = q
    ? `https://www.google.com/maps?q=${q}&output=embed`
    : '';
  const mapLink = q ? `https://www.google.com/maps?q=${q}` : '#';

  return `
    <section id="ubicacion" class="bg-white border-y border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div class="space-y-3">
          <p class="text-xs uppercase tracking-wider text-gray-600">Ubicación</p>
          <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Te esperamos</h2>
          <p class="text-gray-600">Pasá por el local o coordiná retiro. Si querés envío, lo coordinamos por WhatsApp.</p>

          <div class="border border-gray-200 bg-gray-50 p-4 space-y-2">
            <p class="text-sm"><span class="text-gray-500">Dirección:</span> <strong class="font-semibold">${escapeHtml(business.address)}</strong></p>
            <p class="text-sm"><span class="text-gray-500">Horario:</span> ${escapeHtml(business.hoursDisplay || '')}</p>
            <p class="text-sm"><span class="text-gray-500">Tel:</span> <a class="text-red-700 hover:text-red-800" href="tel:${escapeHtml(business.phoneE164)}">${escapeHtml(business.phoneDisplay)}</a></p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-1">
            <a href="${escapeHtml(mapLink)}" target="_blank" rel="noopener" class="btn px-5 py-3 bg-gray-900 text-white border border-gray-900 hover:bg-black transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
              Cómo llegar
            </a>
            <a href="#contacto" class="btn px-5 py-3 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
              Escribinos
            </a>
          </div>
        </div>

        <div class="border border-gray-200 bg-white overflow-hidden">
          ${mapSrc ? `
            <iframe title="Mapa de ubicación" src="${escapeHtml(mapSrc)}" class="w-full h-80" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          ` : `
            <div class="p-6 text-sm text-gray-600">
              Configurá <code class="px-1 bg-gray-100 border border-gray-200">mapQuery</code> en <code class="px-1 bg-gray-100 border border-gray-200">app.js</code> para mostrar el mapa.
            </div>
          `}
        </div>
      </div>
    </section>
  `;
}

function setupFaqAccordion() {
  const root = document.getElementById('faq-accordion');
  if (!root) return;
  const items = Array.from(root.querySelectorAll('details'));
  items.forEach((d) => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      items.forEach((other) => {
        if (other !== d) other.open = false;
      });
    });
  });
}

function setupTestimonialsCarousel() {
  const track = document.getElementById('testimonials-track');
  const prev = document.getElementById('testimonials-prev');
  const next = document.getElementById('testimonials-next');
  if (!track || !prev || !next) return;

  const scrollByAmount = () => {
    const first = track.querySelector('figure');
    const w = first ? (first.getBoundingClientRect().width + 16) : 320;
    return Math.round(w);
  };

  prev.addEventListener('click', () => {
    track.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    track.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
  });
}

function buildContact({ business }) {
  const waDigits = String(business.whatsappE164 || '').replace(/[^\d]/g, '');
  const waMsg = encodeURIComponent('Hola! Quiero coordinar un pedido especial (gran volumen / evento).');
  const waLink = waDigits ? `https://wa.me/${waDigits}?text=${waMsg}` : '#';
  const pedidosYaUrl = business?.pedidosYaUrl || '';

  return `
    <section id="contacto" class="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div class="space-y-2">
        <p class="text-xs uppercase tracking-wider text-gray-600">Contacto</p>
        <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight">Pedidos (canales)</h2>
        <p class="text-gray-600 max-w-2xl">
          <strong class="font-semibold text-gray-900">Pedidos habituales:</strong> catálogo online o PedidosYa.
          <strong class="font-semibold text-gray-900">WhatsApp:</strong> solo para pedidos especiales o coordinaciones extraordinarias.
        </p>
      </div>

      <div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="border border-gray-200 bg-gray-50 p-5 space-y-4">
          <div class="space-y-2">
            <p class="text-xs uppercase tracking-wider text-gray-600">Canales correctos</p>
            <div class="space-y-2 text-sm">
              <p><span class="text-gray-500">Catálogo:</span> <a class="text-red-700 hover:text-red-800" href="${escapeHtml(business.catalogUrl || '#')}" target="_blank" rel="noopener">Abrir catálogo online</a></p>
              ${pedidosYaUrl ? `<p><span class="text-gray-500">PedidosYa:</span> <a class="text-red-700 hover:text-red-800" href="${escapeHtml(pedidosYaUrl)}" target="_blank" rel="noopener">Abrir PedidosYa</a></p>` : ''}
              <p><span class="text-gray-500">WhatsApp (especial):</span> <a class="text-green-700 hover:text-green-800" href="${escapeHtml(waLink)}" target="_blank" rel="noopener">Pedido especial</a></p>
              <p><span class="text-gray-500">Tel:</span> <a class="text-red-700 hover:text-red-800" href="tel:${escapeHtml(business.phoneE164)}">${escapeHtml(business.phoneDisplay)}</a></p>
              <p><span class="text-gray-500">Email:</span> <a class="text-red-700 hover:text-red-800" href="mailto:${escapeHtml(business.email)}">${escapeHtml(business.email)}</a></p>
            </div>
          </div>
          <div class="border-t border-gray-200 pt-4 space-y-2">
            <p class="text-xs uppercase tracking-wider text-gray-600">Recomendación</p>
            <p class="text-sm text-gray-600">
              <strong class="font-semibold text-gray-900">WhatsApp:</strong> solo para pedidos especiales, grandes volúmenes o coordinaciones fuera de lo habitual.
              Para pedidos habituales, usá catálogo online o PedidosYa.
            </p>
          </div>
        </div>

        <form id="contact-form" class="border border-gray-200 bg-white p-5 space-y-4" autocomplete="on">
          <div class="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            <strong class="font-semibold">WhatsApp:</strong> este formulario abre WhatsApp y es solo para <strong class="font-semibold">pedidos especiales</strong>.
            <span class="text-amber-800">Para pedidos habituales, usá catálogo o PedidosYa.</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1.5 text-xs uppercase tracking-wider text-gray-600" for="contact-name">Nombre *</label>
              <input id="contact-name" name="name" required maxlength="80"
                class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-red-600 bg-white text-sm rounded" />
            </div>
            <div>
              <label class="block mb-1.5 text-xs uppercase tracking-wider text-gray-600" for="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" maxlength="120" autocomplete="email"
                class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-red-600 bg-white text-sm rounded" />
            </div>
          </div>
          <div>
            <label class="block mb-1.5 text-xs uppercase tracking-wider text-gray-600" for="contact-message">Mensaje *</label>
            <textarea id="contact-message" name="message" required rows="4" maxlength="800"
              class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-red-600 bg-white text-sm rounded"
              placeholder="Ej: Pedido especial para evento (cantidad, fecha/hora, dirección si aplica)."></textarea>
          </div>

          <!-- Honeypot anti-spam (oculto) -->
          <div class="hidden">
            <label for="contact-company">Empresa</label>
            <input id="contact-company" name="company" tabindex="-1" autocomplete="off">
          </div>

          <label class="flex items-start gap-2 text-sm text-gray-700">
            <input id="contact-special-confirm" name="specialConfirm" type="checkbox" required class="mt-1">
            <span>
              Confirmo que este es un <strong class="font-semibold text-gray-900">pedido especial</strong> o coordinación extraordinaria.
              Para pedidos habituales usaré catálogo o PedidosYa.
            </span>
          </label>

          <div class="flex flex-col sm:flex-row gap-3 pt-1">
            ${pedidosYaUrl ? `
              <a href="${escapeHtml(pedidosYaUrl)}" target="_blank" rel="noopener"
                class="flex-1 px-5 py-3 bg-white text-gray-900 border border-gray-300 hover:border-red-600 hover:text-red-700 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
                PedidosYa
              </a>
            ` : ''}
            <a href="${escapeHtml(waLink)}" target="_blank" rel="noopener"
              class="flex-1 px-5 py-3 border border-gray-300 hover:border-green-700 hover:text-green-800 transition-colors uppercase tracking-wider text-xs sm:text-sm font-light text-center">
              Pedido especial por WhatsApp
            </a>
          </div>
          <p class="text-xs text-gray-500">Pedidos habituales: catálogo / PedidosYa. WhatsApp: solo especiales.</p>
        </form>
      </div>
    </section>
  `;
}

function setupGalleryButtons({ openLightbox }) {
  document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openLightbox?.({
        src: btn.dataset.src,
        alt: btn.dataset.alt,
        captionText: btn.dataset.caption
      });
    });
  });
}

function setupProductFiltering({ showToast }) {
  const buttons = Array.from(document.querySelectorAll('.product-filter-btn'));
  const cards = Array.from(document.querySelectorAll('.product-card'));
  const search = document.getElementById('product-search');
  const empty = document.getElementById('products-empty');

  let category = 'Todos';
  let query = '';

  const apply = () => {
    const q = query.trim().toLowerCase();
    let visible = 0;

    cards.forEach(card => {
      const c = (card.dataset.category || '').trim();
      const n = (card.dataset.name || '').trim().toLowerCase();
      const matchCategory = category === 'Todos' || c === category;
      const matchQuery = !q || n.includes(q);
      const ok = matchCategory && matchQuery;
      card.classList.toggle('hidden', !ok);
      if (ok) visible += 1;
    });

    if (empty) empty.classList.toggle('hidden', visible !== 0);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      category = btn.dataset.category || 'Todos';
      buttons.forEach(b => {
        b.classList.remove('bg-red-50', 'border-red-200', 'text-red-700');
        b.classList.add('bg-white', 'text-gray-700');
      });
      btn.classList.add('bg-red-50', 'border-red-200', 'text-red-700');
      btn.classList.remove('bg-white', 'text-gray-700');
      apply();
      showToast?.(`Filtro: ${category}`);
    });
  });

  if (search) {
    search.addEventListener('input', () => {
      query = search.value || '';
      apply();
    });
  }

  // Product image opens lightbox
  document.querySelectorAll('.product-img-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.NRDWeb?.openLightbox?.({
        src: btn.dataset.src,
        alt: btn.dataset.alt,
        captionText: btn.dataset.caption
      });
    });
  });
}

function setupContactForm({ business, showToast }) {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Keep the form as a simple “consulta” helper: on submit, open WhatsApp with message.
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const honeypot = String(data.get('company') || '').trim();
    if (honeypot) {
      showToast?.('Gracias.');
      form.reset();
      return;
    }

    const name = String(data.get('name') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !message) {
      showToast?.('Completá nombre y mensaje.');
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

export function initializeHome({ business, showToast, openLightbox }) {
  logger.debug('Initializing home view');

  const container = document.getElementById('view-container');
  if (!container) {
    logger.error('view-container not found');
    return;
  }

  const products = DEFAULT_PRODUCTS;
  const testimonials = DEFAULT_TESTIMONIALS;
  const gallery = DEFAULT_GALLERY;

  container.innerHTML = `
    ${buildHero({ business })}
    ${buildProducts({ products })}
    ${buildHowToOrder({ business })}
    ${buildGallery({ gallery })}
    ${buildTestimonials({ testimonials })}
    ${buildEvents({ business })}
    ${buildFaq()}
    ${buildLocation({ business })}
    ${buildContact({ business })}
    <noscript>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-sm text-red-700">
        Para ver todas las interacciones (filtros, galería), activá JavaScript.
      </div>
    </noscript>
  `;

  // Hero WhatsApp CTA (pedido especial)
  const heroWhatsappSpecial = document.getElementById('hero-whatsapp-special');
  if (heroWhatsappSpecial) {
    const waDigits = String(business?.whatsappE164 || '').replace(/[^\d]/g, '');
    const msg = encodeURIComponent('Hola! Quiero coordinar un pedido especial (gran volumen / evento).');
    heroWhatsappSpecial.setAttribute('href', waDigits ? `https://wa.me/${waDigits}?text=${msg}` : '#');
  }

  // Hero catalog CTA
  const heroCatalog = document.getElementById('hero-catalogo');
  if (heroCatalog) {
    const url = business?.catalogUrl || '';
    if (url) heroCatalog.setAttribute('href', url);
    else heroCatalog.classList.add('hidden');
  }

  // Hero PedidosYa CTA
  const heroPedidosYa = document.getElementById('hero-pedidosya');
  if (heroPedidosYa) {
    const url = business?.pedidosYaUrl || '';
    if (url) heroPedidosYa.setAttribute('href', url);
    else heroPedidosYa.classList.add('hidden');
  }

  // Catalog button
  const catalogBtn = document.getElementById('catalogo-online-btn');
  if (catalogBtn) {
    const url = business?.catalogUrl || '';
    if (url) catalogBtn.setAttribute('href', url);
    else catalogBtn.classList.add('hidden');
  }

  setupGalleryButtons({ openLightbox });
  setupProductFiltering({ showToast });
  setupContactForm({ business, showToast });
  setupTestimonialsCarousel();
  setupFaqAccordion();
}

