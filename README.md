# 🏹 TPJavascript - Jeu de Rôle Tour par Tour

Bienvenue dans ce projet de jeu de rôle au tour par tour où vous incarnez un personnage avec des compétences uniques et affrontez des adversaires contrôlés par l'IA. 🚀

# ⚡ Installation et Lancement du Projet

### ✅ Pré-requis

Assurez-vous d'avoir Node.js et PHP installés sur votre machine.

### 🚀 Démarrer le projet

Ouvrez un terminal et exécutez les deux commandes suivantes (dans le dossier du projet) :

```
# Lancer le serveur JSON pour les données des personnages
npx json-server perso.json

# Lancer le serveur PHP
php -S localhost:8000
```

Une fois ces commandes exécutées, ouvrez un navigateur et accédez à :
👉 http://localhost:8000

# 🎮 Fonctionnalités du Jeu

### 1️⃣ Page d'accueil

- Choix du pseudo ✍️ : Le joueur entre son pseudo qui sera affiché durant les combats.

- Sélection de classe ⚔️ : 7 classes disponibles, chacune avec ses capacités uniques.

- Personnalisation 🎨 : Possibilité de modifier certains attributs (couleur d’armure, etc.).

- Option tutoriel 📖 : Explication des mécaniques de combat et des objets.

### 2️⃣ Les Classes de Personnages

Chaque classe a ses propres statistiques, capacités et gestion du mana :

| Classe | Stats | Capacités Uniques |
| :--------------- |:---------------:| -----:|
| 🛡️ Guerrier du Nord | Haute défense, Attaque moyenne, Faible mana |	Frappe puissante, Parade, Cri de guerre, Charge
| 🔥❄️ Mage Élémentaire |	Faible défense, Attaque magique élevée, Haute mana | Boule de feu, Souffle glacé, Bouclier élémentaire, Tempête élémentaire
| 🗡️ Voleur de l’Ombre | Haute vitesse, Défense faible, Attaque moyenne | Coup critique, Disparition, Vol de vie, Piège d’ombre
| 🏹 Archer Elfique | Haute précision, Attaque moyenne, Mana moyenne |	Flèche perçante, Pluie de flèches, Flèche enflammée, Dissimulation
| ☠️ Nécromancien Maudit | Haute mana, Défense faible, Attaque moyenne | Invocation de squelettes, Drain de vie, Malédiction de l’âme, Résurrection
| 🏯 Samouraï Errant | Haute attaque, Défense moyenne, Mana basse | Coup rapide, Parade de katana, Tranchant du vent, Concentration
| 🤖 Cyborg du Futur | Haute défense, Attaque moyenne, Régénération de mana rapide | Coup mécanique, Laser à haute énergie, Bouclier énergétique, Surcharge de circuits

### 3️⃣ Système de Mana

- Régénération automatique 🔋 : Chaque classe regagne du mana à chaque tour.

- Gestion stratégique 🎯 : Chaque action a un coût en mana, il faut bien choisir ses attaques !

### 4️⃣ Système de Combat au Tour par Tour

- 🎭 Choix d’une action parmi les 4 capacités du personnage.

- 🤖 IA du bot : L’ennemi choisit ses actions de manière semi-aléatoire.

- ⚡ Vitesse et Initiative : Un personnage rapide peut attaquer avant un adversaire plus lent.

### 5️⃣ Objets à Ramasser en Combat

- ❤️ Potions de soin (récupération de PV).

- 🔵 Potions de mana (restauration de mana).

- 💪 Buffs temporaires (attaque ou défense augmentée).

- 🛡️ Équipements pour améliorer les stats du joueur.

### 6️⃣ Sauvegarde de la Partie (JSON)

- 🔄 Progression enregistrée : Pseudo, classe, stats et objets sont sauvegardés.

- 📂 Chargement de sauvegarde possible depuis l’accueil.

### 7️⃣ Interface de Jeu

- 📊 Affichage des PV et Mana sous forme de barres dynamiques.

- 📝 Journal de combat pour voir les actions effectuées.

- 🎨 Animations simples pour améliorer l’expérience utilisateur.

### 8️⃣ Système de Progression

- ⭐ Gain d’expérience après chaque combat.

- 📈 Augmentation des stats au fil du temps.

### 9️⃣ Difficulté Croissante et Boss

- 📊 Ennemis de plus en plus puissants.

- 👹 Boss tous les 5 combats avec des attaques spéciales.

### 🛠 Technologies Utilisées

- HTML / CSS / JavaScript 🖥️

- JSON Server (pour la gestion des données des personnages) 📦

- PHP (serveur local) ⚡

### 📌 Amusez-vous bien ! 🎮🔥
