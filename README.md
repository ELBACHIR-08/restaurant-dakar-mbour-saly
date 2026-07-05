# Sommelier Digital AI - reservation flow UX

Version corrigee pour Vercel avec tunnel de reservation conversationnel.

Nouveautes :
- boutons evolutifs directement dans le chatbot ;
- parcours "Je veux reserver" en plusieurs etapes :
  1. type de venue : seul, couple, amis, anniversaire, entreprise ;
  2. nombre de personnes avec auto-remplissage pour seul/couple ;
  3. date en bas de conversation ;
  4. heure en bas de conversation ;
  5. suggestion contextuelle d'upsell ;
  6. recapitulatif + acompte wallet ;
- mode mobile toujours fige sur la discussion ;
- aucun zoom input mobile ;
- boutons Ajouter au panier et boutons de choix cliquables ;
- navigation homepage conservee : Chatbot live, Dashboard, Script chatbot, Offre client ;
- API Vercel serverless conservee : /api/chat et /api/health.

Deploiement :
1. dezipper le fichier ;
2. uploader tout le contenu du dossier a la racine du repo GitHub ;
3. remplacer les fichiers existants ;
4. Commit changes ;
5. Vercel redeploie automatiquement.

A verifier apres deploy :
- ouvrir la page sur mobile ;
- cliquer Chatbot live ;
- cliquer "Reserver une table" ;
- suivre le flow jusqu'au paiement Wave ;
- tester /api/health.
