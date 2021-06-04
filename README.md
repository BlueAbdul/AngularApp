# App Angular Abdelhakim

## Config


lancez **npm install**

Installez le package http server en global **npm install --global http-server**

le projet a été réalisé sur une DB locale avec MongoDB

pour éditer le chemin de la DB rendez-vous dans le fichier **.env** a la racine du projet pour changer l'adresse de connection

Le Drag and Drop est disponible sur le tableau des tâches

Un fichier fixtures.js permets de créer directement des données de test, le mot de passe des utilisateurs est visible dans ce fichier ( ils sont cryptés en DB ) 

Liste des commandes : 

 **npm run backend** |  **npm run fixtures** | **npm run app:dev** | **npm run app**
 ------------ | ------------- | ------------- | ------------- |
 Lance l'API Express | Lance un fichier qui créé des valeurs de test dans la DB | Lance l'application angular et l'api express dans l'environnement de dev | Lance l'application angular et express dans l'environnement de production

 ### Attention !!!!!!!

 Pour utiliser l'API vous devez avoir un token d'accès, ce token est disponible sur la route **/authentification** de l'API

 L'app angular gère automatiquement les tokens 
