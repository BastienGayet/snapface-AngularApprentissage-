# Étape 1 : Utiliser une image Node.js pour construire l'application Angular
FROM node:23.5 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY package*.json ./
COPY . .

# Installer les dépendances et construire l'application Angular
RUN npm install
RUN npm run build --production 

# Étape 2 : Utiliser une image NGINX pour servir l'application Angular
FROM nginx:alpine

# Copier les fichiers de build Angular dans le répertoire par défaut de NGINX
COPY --from=build /app/dist/snapface /usr/share/nginx/html


# Exposer le port 80
EXPOSE 80

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]
