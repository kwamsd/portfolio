README – Guide de déploiement

1. Prérequis
	•	Node.js ≥ 14
	•	npm ou yarn
	•	PHP 8.x
	•	MySQL 5.7+
	•	Git
	•	Serveur web (Apache 2.4+ ou Nginx)
	•	Accès GitHub Actions pour le CI/CD

2. Installation locale
	1.	Cloner le dépôt :

git clone https://github.com/skills-formation/site-vitrine.git

	2.	Se déplacer dans le dossier projet :

cd site-vitrine

	3.	Installer les dépendances front :

npm install

	4.	Installer les dépendances back (si Composer utilisé) :

composer install

	5.	Copier et configurer le fichier d’environnement :

cp .env.example .env

Modifier les variables DB_HOST, DB_NAME, DB_USER, DB_PASS dans .env.
	6.	Initialiser la base de données :

php scripts/init_db.php

	7.	Lancer le serveur de développement :

npm run dev

Puis, dans un autre terminal :

php -S localhost:8000 -t public

3. CI/CD (GitHub Actions)

Le workflow .github/workflows/ci-cd.yml gère :
	•	Installation des dépendances
	•	Build production front (npm run build)
	•	Minification CSS/JS
	•	Audit sécurité OWASP ZAP
	•	Tests Lighthouse (PageSpeed)
	•	Déploiement automatique via SSH et rsync

Variables secrètes GitHub Actions
	•	SSH_HOST
	•	SSH_USER
	•	SSH_KEY_PRIVATE
	•	REMOTE_PATH

4. Commandes clés
	•	Générer le build production :

npm run build

	•	Exécuter les tests JavaScript :

npm test

	•	Lancer un audit Lighthouse local :

lighthouse http://localhost:8000 --output html --output-path ./reports/lighthouse.html

5. Déploiement manuel
	1.	Générer le build :

npm run build

	2.	Copier les fichiers sur le serveur :

rsync -avz public/ user@host:/var/www/site-vitrine/
rsync -avz build/ user@host:/var/www/site-vitrine/assets/

	3.	Redémarrer le service web si nécessaire :

ssh user@host "sudo systemctl reload nginx"

6. Support

Pour toute question ou problème, contactez Marcel Cakpo : marcel.cakpo@skillsformation.com
