# Restaurant Revenue AI - Sommelier Digital Live MVP

Prototype HTML/CSS/JS + serveur Node local, sans dépendance externe.

## Lancer le chatbot en live

```bash
npm run dev
```

Puis ouvrir :

```text
http://127.0.0.1:5173
```

## Ce qui est inclus

- Chatbot interactif live avec champ de saisie et réponses contextuelles
- Suggestions automatiques d'accords mets-vins/cocktails
- Cartes cliquables pour ajouter un plat, un vin, un cocktail ou un dessert au panier
- Panier dynamique, calcul d'uplift et estimation de panier moyen
- Réservation avec acompte wallet en mode démonstration
- Endpoint local `/api/chat` pour tester un vrai flux chatbot côté serveur
- Fallback 100 % front-end si le serveur API n'est pas disponible

## Exemples à tester dans le chatbot

- `Je viens en couple`
- `Je veux le Chateaubriand`
- `Je préfère du poisson`
- `Anniversaire pour 4 personnes`
- `J'ai un budget de 60000`
- `Je veux réserver à 20h30`
- `Je paie avec Wave`

## Déploiement public

Ce projet peut être mis en ligne sur un hébergeur Node.js en utilisant :

```bash
npm start
```

Port par défaut : `5173`, ou variable d'environnement `PORT` si l'hébergeur l'impose.
