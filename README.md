# Sommelier Digital - MVP Vercel Ready

Prototype de demonstration du Sommelier Digital pour restaurant premium.

## Mise a jour incluse

Cette version corrige le test mobile du chatbot :

- mode discussion plein ecran sur mobile ;
- page verrouillee pendant la saisie ;
- plus de zoom automatique sur le champ de saisie ;
- scroll limite a la zone de conversation ;
- bouton `Quitter` pour sortir du mode discussion ;
- compatibilite Vercel avec `framework: null`.

## Structure attendue a la racine du repo

- `index.html`
- `package.json`
- `vercel.json`
- `api/chat.js`
- `api/health.js`
- `.gitignore`
- `README.md`

## Deploiement

1. Uploader tout le contenu du dossier dans GitHub.
2. Commit changes.
3. Dans Vercel, redeploy sans cache.
4. Tester `/health` puis la page principale.


## Correctif interaction mobile

Cette version corrige le mode chatbot mobile : l’écran reste figé sur la discussion et les boutons “Ajouter au panier” restent cliquables en un seul tap, même après la saisie d’un message.
