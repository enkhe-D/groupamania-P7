### backend

Mettre les informations pour les variables d environnement (base de donnée MongoDB Atlas)

Lancer le server avec la commande: `$ npm nodemon server`

### frontend

Lancer le frontend avec la commande: `$ yarn start`

## Routes

Toutes les routes sont protégées par TOKEN

# Route Post pour créer un compte

http://localhost:5000/api/auth/signup

# Route Post pour se logger

http://localhost:5000/api/auth/login

### Posts

# Route Post pour creer un post

http://localhost:5000/api/post/

# Route GET pour afficher les posts

http://localhost:5000/api/fiche-user/

# Route GET pour afficher un post

http://localhost:5000/api/fiche-user/:id

# Route PUT pour modifier une post

http://localhost:5000/api/fiche-user/

# Route DELETE pour une post

http://localhost:5000/api/fiche-user/

# Routes Posts like

http://localhost:5000/api/post/like/:id

# Routes PATCH Comments

http://localhost:5000/api/post/comment-post/:id

# Routes PATCH edit Comments

http://localhost:5000/api/post/edit-comment-post/:id

# Routes PATCH delete Comments

http://localhost:5000/api/post/dlete-comment-post/:id
