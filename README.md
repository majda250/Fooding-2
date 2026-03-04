# FOODING v2 🍽️

Application de découverte de restaurants — React + Node/Express + MongoDB Atlas

## Structure

```
fooding-v2/
├── client/   ← React + Vite + Tailwind
└── server/   ← Node + Express + MongoDB
```

## Installation

### 1. MongoDB Atlas (obligatoire)
1. Créer un compte sur https://cloud.mongodb.com
2. Créer un cluster gratuit (M0)
3. Créer un utilisateur DB et noter user/password
4. Whitelister votre IP (ou 0.0.0.0/0 pour dev)
5. Copier l'URI de connexion

### 2. Serveur
```bash
cd server
cp .env.example .env
# Editer .env avec votre MONGODB_URI Atlas
npm install
npm run dev   # avec nodemon (dev)
# ou
npm start     # production
```

### 3. Client
```bash
cd client
npm install
npm run dev
```

L'app sera sur http://localhost:5173

## Import des données (depuis Zainab)

Si vous avez les fichiers rabat.json et tanger.json :
```bash
mongoimport --uri "VOTRE_URI_ATLAS" --collection Rabat  --file rabat.json
mongoimport --uri "VOTRE_URI_ATLAS" --collection Tanger --file tanger.json
```

## Variables d'environnement

### server/.env
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=un_secret_long_et_complexe
NODE_ENV=development
```

## Pages
- `/`                      → Home
- `/city-guide`            → Liste restaurants + filtres
- `/restaurant/:ville/:id` → Détail + Google Maps
- `/login`                 → Connexion
- `/signup`                → Inscription
- `/profil`                → Profil (protégé)
