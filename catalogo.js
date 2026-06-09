// catalogo.js — fonte única de dados de camisetas
// Todas as páginas carregam via loadCatalogo() e acessam window.CATALOGO

async function loadCatalogo() {
  if (window.CATALOGO) return window.CATALOGO;
  const res = await fetch('data/camisetas.json');
  window.CATALOGO = await res.json();
  return window.CATALOGO;
}

function getCartCount() {
  return JSON.parse(localStorage.getItem('cart') || '[]').length;
}

function syncCartBadge() {
  const el = document.getElementById('cartCount');
  if (el) el.textContent = getCartCount();
}

function addToCart(product, size, qty = 1) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(i => i.id === product.id && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      club: product.club,
      liga: product.liga,
      price: product.price,
      size: size,
      qty: qty,
      enc: product.status === 'encomenda',
      color: product.color,
      stroke: product.stroke,
      imagem: product.imagens ? product.imagens[0] : null
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  syncCartBadge();
}

function jerseyPlaceholderSVG(product, w = 100, h = 130) {
  const label = (product.club || '').toUpperCase().substring(0, 10);
  return `<svg width="${w}" height="${h}" viewBox="0 0 200 260" fill="none">
    <path d="M60 20L30 60L10 55L25 100L10 200L80 215L80 120L120 120L120 215L190 200L175 100L190 55L170 60L140 20L120 30L110 60Q100 70 90 60L80 30Z"
      fill="${product.color || 'rgba(100,100,100,0.3)'}"
      stroke="${product.stroke || 'rgba(150,150,150,0.5)'}"
      stroke-width="2"/>
    <text x="100" y="155" font-family="Bebas Neue,sans-serif" font-size="13"
      fill="${product.stroke || 'rgba(200,200,200,0.5)'}" text-anchor="middle">${label}</text>
  </svg>`;
}

// Retorna HTML da imagem principal (imagens[0]) com fallback SVG
function productImageHTML(product, w = 100, h = 130) {
  const src = product.imagens ? product.imagens[0] : product.imagem;
  if (src) {
    return `<img src="${src}" alt="${product.club} ${product.name}"
      style="width:100%;height:100%;object-fit:cover;display:block"
      onerror="this.style.display='none'">`;
  }
  return jerseyPlaceholderSVG(product, w, h);
}