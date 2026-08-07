/**
 * Cliente HTTP de contenido web → https://api.nrdonline.site/web
 * Misma key que el catálogo. Si falla, nrd-web usa defaults locales.
 */

const API_BASE = 'https://api.nrdonline.site';
const CATALOG_API_KEY = 'nrd_cat_099199ad1a2afa6556de09e7a14f41647d4c83ee66d8af8c';

async function parseResponse(res) {
  let body = null;
  const text = await res.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch (e) {
      body = { error: text };
    }
  }
  if (!res.ok) {
    const msg = (body && body.error) ? String(body.error) : ('Error ' + res.status);
    const err = new Error(msg);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

/**
 * GET /web — contenido público de nrd-web
 * @returns {Promise<object>}
 */
export async function fetchWebContent() {
  const res = await fetch(API_BASE + '/web', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-Catalog-Key': CATALOG_API_KEY
    },
    cache: 'no-store'
  });
  return parseResponse(res);
}

export { API_BASE };
