const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = Number(process.env.PORT || 5173);
const ROOT = __dirname;

const catalog = {
  chateaubriand: {
    name: 'Chateaubriand 600g', type: 'Plat', price: 45000,
    reply: "Excellent choix. Le Chateaubriand est le meilleur support d'upsell premium : je vous propose un Bordeaux Saint-Julien ou un Pessac-Léognan.",
    cards: ['chateaubriand','petitcaillou','lepape','gambas','moelleux']
  },
  canard: {
    name: 'Confit de canard', type: 'Plat', price: 28500,
    reply: "Très bon choix gourmand. Le meilleur angle commercial est de proposer deux options : une accessible et une premium.",
    cards: ['canard','champy','chaireclavel','cremebrulee']
  },
  daurade: {
    name: 'Filet de daurade royale', type: 'Plat', price: 16500,
    reply: "Pour la daurade, je recommande un accord blanc sec et frais. Cela ajoute de la valeur sans alourdir l'expérience.",
    cards: ['daurade','chablis','riesling','cremebrulee']
  },
  tartare: {
    name: 'Tartare de boeuf au couteau', type: 'Plat', price: 16500,
    reply: "Le tartare se vend très bien avec un rouge structuré. Je propose une option accessible et une option plus charpentée.",
    cards: ['tartare','malbec','chevalnoir','frites']
  },
  asia: {
    name: "L'Asia - plateau à partager", type: 'Plat', price: 16500,
    reply: "Pour une table entre amis, le format à partager est idéal. Le chatbot peut pousser Prosecco ou Sancerre selon le contexte.",
    cards: ['asia','sancerre','prosecco','carteblanche']
  },
  tiramisu: {
    name: 'Tiramisu destructure', type: 'Dessert', price: 7500,
    reply: "Très bon choix de fin de repas. C'est le moment parfait pour proposer un cocktail ou une touche festive.",
    cards: ['tiramisu','espresso','lyvrose','glace']
  },
  anniversaire: {
    reply: "Pour un anniversaire, je recommande un parcours en 3 temps : table sécurisée avec acompte, produit à partager, puis champagne ou cocktail signature.",
    cards: ['carteblanche','lyvrose','prosecco','tiramisu']
  },
  reservation: {
    reply: "Je peux sécuriser la réservation avec un acompte wallet. Le montant sera déduit de l'addition le jour J.",
    cards: ['deposit20000','wave','orangeMoney','freeMoney']
  },
  budget: {
    reply: "Avec ce budget, je compose un panier optimisé : plat fort + accord accessible + dessert ou cocktail selon le moment.",
    cards: ['daurade','riesling','cremebrulee','espresso']
  },
  default: {
    reply: "Je peux vous aider à choisir un plat, proposer un accord vin/cocktail, composer un panier ou sécuriser une réservation avec acompte. Essayez : Chateaubriand, poisson, anniversaire, budget 60000 ou réservation.",
    cards: ['chateaubriand','daurade','asia','tiramisu']
  }
};

function detectIntent(message = '') {
  const m = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/chateaubriand|boeuf premium|viande premium|600g/.test(m)) return 'chateaubriand';
  if (/canard|confit/.test(m)) return 'canard';
  if (/poisson|daurade|sole|meuniere/.test(m)) return 'daurade';
  if (/tartare/.test(m)) return 'tartare';
  if (/sushi|asia|partager|amis|groupe/.test(m)) return 'asia';
  if (/dessert|tiramisu|moelleux|chocolat/.test(m)) return 'tiramisu';
  if (/anniversaire|birthday|celebration|fete/.test(m)) return 'anniversaire';
  if (/reserv|table|20h|21h|midi|dejeuner|diner|acompte|no show/.test(m)) return 'reservation';
  if (/wave|orange money|free money|payer|paiement|wallet/.test(m)) return 'reservation';
  if (/budget|fcfa|xof|moins de|pas depasser|60000|50000|40000|30000/.test(m)) return 'budget';
  return 'default';
}

function buildReply(message, payload = {}) {
  const intent = detectIntent(message);
  const base = catalog[intent] || catalog.default;
  const lower = String(message || '').toLowerCase();
  const followups = [];

  if (intent === 'reservation') {
    if (/wave|orange money|free money|payer|paiement|wallet/.test(lower)) {
      followups.push('Paiement simulé prêt : choisissez le wallet dans le panier et cliquez sur confirmer.');
    } else {
      followups.push('Quel créneau souhaitez-vous ? Exemple : ce soir 20h30, 2 personnes.');
    }
  }
  if (intent === 'chateaubriand') followups.push('Voulez-vous une version accessible ou premium pour le vin ?');
  if (intent === 'daurade') followups.push('Souhaitez-vous rester léger ou ajouter un dessert ?');
  if (intent === 'anniversaire') followups.push('Je peux ajouter une Carte Blanche et un champagne rosé au panier.');

  return {
    mode: 'server-live',
    intent,
    reply: base.reply,
    followups,
    cards: base.cards,
    timestamp: new Date().toISOString()
  };
}

function sendJson(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(data));
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg' };
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/health') {
    sendJson(res, 200, { ok: true, service: 'sommelier-digital-live', port: PORT });
    return;
  }

  if (url.pathname === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 1e6) req.destroy(); });
    req.on('end', () => {
      try {
        const payload = body ? JSON.parse(body) : {};
        const answer = buildReply(payload.message, payload);
        sendJson(res, 200, answer);
      } catch (e) {
        sendJson(res, 400, { error: 'Invalid JSON' });
      }
    });
    return;
  }

  const requested = url.pathname === '/' ? '/index.html' : url.pathname;
  const safePath = path.normalize(requested).replace(/^([.][.][\/])+/, '');
  const filePath = path.join(ROOT, safePath);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  serveFile(res, filePath);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Sommelier Digital live on http://127.0.0.1:${PORT}`);
});
