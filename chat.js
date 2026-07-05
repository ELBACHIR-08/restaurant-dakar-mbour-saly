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
  order: {
    reply: "Je peux gérer une commande directe : livraison ou à emporter, nombre de personnes, zone, frais estimés, panier et paiement wallet.",
    cards: ['daurade','tagliatelles','volaille','tiramisu']
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
  if (/livraison|livrer|domicile|commande|commander|emporter|retrait|takeaway|delivery/.test(m)) return 'order';
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
  if (intent === 'order') {
    followups.push('Souhaitez-vous une livraison à domicile ou une commande à emporter ?');
    followups.push('Le chatbot va filtrer les plats adaptés à la livraison, puis proposer dessert, boisson ou sauce.');
  }
  if (intent === 'chateaubriand') followups.push('Voulez-vous une version accessible ou premium pour le vin ?');
  if (intent === 'daurade') followups.push('Souhaitez-vous rester léger ou ajouter un dessert ?');
  if (intent === 'anniversaire') followups.push('Je peux ajouter une Carte Blanche et un champagne rosé au panier.');

  return {
    mode: 'vercel-serverless-live',
    intent,
    reply: base.reply,
    followups,
    cards: base.cards,
    timestamp: new Date().toISOString()
  };
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body) {
      if (typeof req.body === 'string') {
        try { resolve(JSON.parse(req.body)); } catch (e) { reject(e); }
      } else {
        resolve(req.body);
      }
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const payload = await parseBody(req);
    const answer = buildReply(payload.message, payload);
    res.statusCode = 200;
    res.end(JSON.stringify(answer));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Invalid JSON', detail: error.message }));
  }
};
