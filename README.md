# Sommelier Digital AI - reservation + commande/livraison + contact client

Version Vercel-ready avec un tunnel conversationnel complet pour restaurant : reservation sur place, commande en livraison, commande a emporter, upsell, paiement wallet et collecte subtile du contact client.

Nouveautes principales :
- bouton "Commander / livraison" directement dans le chatbot ;
- choix du mode : reservation, livraison a domicile ou a emporter ;
- nombre de personnes : 1, 2, 3-4, 5+ ou saisie libre ;
- zone de livraison : Plateau, Almadies, Ngor, Mermoz, Sacre-Coeur, Mbour/Saly ou autre zone ;
- frais de livraison et delai estimes dans la conversation ;
- menu filtre pour livraison : repas complet, plat principal, a partager, dessert, suggestion du Chef ;
- upsell livraison : dessert, boisson maison, sauce, pack duo/groupe ;
- collecte subtile du contact au bon moment : WhatsApp/SMS/email pour reservation, telephone obligatoire pour livraison, email optionnel pour recu ;
- email complementaire propose pour groupe, anniversaire ou entreprise ;
- micro-mention de confidentialite avant saisie du contact ;
- opt-in marketing separe apres confirmation, jamais coche par defaut ;
- recapitulatif avant paiement : mode, contact, zone/retrait, delai, frais, total, suggestion ;
- paiement simule : Wave, Orange Money, Free Money, ou paiement a la livraison ;
- chatbot toujours fige sur mobile, sans zoom ni deplacement d'ecran ;
- boutons Ajouter au panier et boutons de choix cliquables.

Deploiement :
1. Dezipper le fichier.
2. Uploader tout le contenu du dossier a la racine du repo GitHub.
3. Remplacer les fichiers existants.
4. Cliquer sur Commit changes.
5. Vercel redeploie automatiquement.

A verifier apres deploy :
- ouvrir la page sur mobile ;
- tester reservation : Chatbot live -> Reserver -> En couple -> Demain -> 20h30 -> Chateaubriand + Saint-Julien -> WhatsApp -> telephone -> Wave ;
- tester livraison : Commander / livraison -> Livraison a domicile -> 2 personnes -> Almadies -> Repas complet -> Daurade + creme brulee -> telephone -> adresse -> email ou non -> Wave ;
- tester entreprise : Reserver -> Entreprise -> 6 personnes -> date/heure -> demande de devis -> telephone -> email optionnel ;
- tester /api/health.
