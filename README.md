# Sommelier Digital - MVP Vercel Ready

Prototype de démonstration du Sommelier Digital pour restaurant premium.

## Contenu

- `index.html` : interface mobile/desktop du MVP
- `api/chat.js` : endpoint chatbot compatible Vercel Serverless Functions
- `api/health.js` : endpoint de test santé
- `server.js` : serveur local Node.js pour tester sans Vercel
- `vercel.json` : rewrite `/health` vers `/api/health`

## Test local classique

```bash
npm run dev
```

Puis ouvrir :

```text
http://127.0.0.1:5173
```

## Déploiement Vercel via GitHub

1. Dézipper ce dossier.
2. Créer un nouveau repository GitHub.
3. Ajouter tout le contenu du dossier, pas le fichier ZIP lui-même.
4. Importer le repository dans Vercel.
5. Framework Preset : Other.
6. Build Command : vide.
7. Output Directory : vide ou `.`.
8. Cliquer sur Deploy.

Le chatbot live utilise `/api/chat` en ligne.
