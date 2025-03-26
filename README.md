# TPJavascript

1. Page d'accueil

    Choix du pseudo : L'utilisateur entre son pseudo, qui sera affiché pendant les combats.
    Choix de la classe : Chaque joueur choisit une classe parmi les 7 classes disponibles (Guerrier du Nord, Mage Élémentaire, etc.). Il serait intéressant de montrer une brève description des capacités spécifiques de chaque classe lors de la sélection pour aider le joueur à faire son choix.
    Personnalisation du personnage : Pour ajouter un peu plus de profondeur, tu pourrais proposer une légère personnalisation du personnage (ex : couleur d’armure, attributs mineurs comme la chance ou la vitesse).
    Option tutoriel : Un tutoriel optionnel peut être proposé pour expliquer les mécaniques de base (combats, objets, mana, etc.).

2. Classes des personnages

Chaque classe a ses propres caractéristiques, une valeur de mana initiale et des capacités uniques. Voici quelques idées pour différencier chaque classe :

    Guerrier du Nord 🛡️ :
        Stats : Haute défense, moyenne attaque, faible mana.
        Capacités :
            Attaque puissante - Frappe l’ennemi avec une attaque physique dévastatrice.
            Parade - Réduit les dégâts reçus au prochain tour.
            Cri de guerre - Augmente temporairement l'attaque.
            Charge - Attaque avec une chance d’étourdir l'ennemi.

    Mage Élémentaire 🔥❄️ :
        Stats : Faible défense, haute attaque magique, haute mana.
        Capacités :
            Boule de feu - Inflige des dégâts de feu à distance.
            Souffle glacé - Ralentit l'ennemi et réduit son attaque.
            Bouclier élémentaire - Réduit les dégâts magiques subis.
            Tempête élémentaire - Attaque de zone infligeant des dégâts aléatoires (coût élevé en mana).

    Voleur de l’Ombre 🗡️ :
        Stats : Haute vitesse, faible défense, moyenne attaque.
        Capacités :
            Coup de dague - Une attaque rapide qui a une chance de critique.
            Disparition - Le voleur devient invisible et évite le prochain coup.
            Vol de vie - Attaque l'ennemi et récupère une partie des dégâts en santé.
            Piège d’ombre - Place un piège qui immobilise l'ennemi.

    Archer Elfique 🏹 :
        Stats : Haute précision, moyenne attaque, moyenne mana.
        Capacités :
            Flèche perçante - Attaque à distance qui traverse les défenses.
            Pluie de flèches - Tire plusieurs flèches en infligeant des dégâts légers à chaque tour.
            Flèche enflammée - Inflige des dégâts sur la durée (feu).
            Dissimulation - Augmente les chances d’esquiver les attaques.

    Nécromancien Maudit ☠️ :
        Stats : Haute mana, faible défense, attaque moyenne.
        Capacités :
            Invocation de squelettes - Invoque des sbires pour attaquer à sa place.
            Drain de vie - Absorbe la santé de l’ennemi.
            Malédiction de l'âme - Diminue l’attaque de l’ennemi.
            Résurrection - Récupère des points de vie lorsqu'un sbire meurt.

    Samouraï Errant 🏯 :
        Stats : Haute attaque, moyenne défense, basse mana.
        Capacités :
            Coup rapide - Attaque avec une grande vitesse.
            Parade de katana - Bloque complètement la prochaine attaque.
            Tranchant du vent - Une attaque qui ignore les armures.
            Concentration - Récupère du mana et augmente la précision pour un tour.

    Cyborg du Futur 🤖 :
        Stats : Haute défense, attaque moyenne, mana régénération rapide.
        Capacités :
            Coup mécanique - Une frappe physique puissante.
            Laser à haute énergie - Attaque magique qui consomme beaucoup de mana.
            Bouclier énergétique - Réduit les dégâts pendant 3 tours.
            Surcharge de circuits - Inflige des dégâts à l’ennemi en échange de quelques points de vie.

3. Système de Mana

    Régénération : Chaque personnage régénère un certain nombre de points de mana à chaque tour (ex : le mage régénère plus de mana que le guerrier).
    Coût des actions : Chaque action a un coût en mana, plus l'action est puissante, plus elle coûte cher.

4. Système de combat tour par tour

    Choix des actions : À chaque tour, le joueur choisit une action parmi les 4 proposées.
    Bot adversaire : Le bot adversaire choisit également une action au hasard parmi ses capacités. Plus tard, tu pourrais introduire une IA plus sophistiquée qui réagit aux actions du joueur.
    Ordre de jeu : L’ordre est déterminé par un attribut "vitesse" (ou initiative) qui peut différer selon les classes. Si un personnage est plus rapide, il peut jouer avant l’autre.

5. Objets à ramasser

Pendant le combat, des objets peuvent apparaître de manière aléatoire. Les joueurs peuvent choisir de ramasser un objet plutôt que d'attaquer durant leur tour.

    Types d'objets :
        Potions de soin - Récupère des points de vie.
        Potions de mana - Récupère du mana.
        Améliorations temporaires - Augmente l'attaque ou la défense pour quelques tours.
        Pièces d’équipement - Boucliers, épées, bâtons magiques, etc., pour renforcer les capacités du joueur.

6. Sauvegarde de la partie (via JSON)

    Données sauvegardées : Pseudo du joueur, classe choisie, objets ramassés, points de vie et de mana restants, progression dans le combat (ex : nombre de rounds).
    Sauvegarde automatique : La partie peut être sauvegardée automatiquement à chaque tour, ou manuellement à certains points (comme après chaque combat).
    Chargement de partie : Depuis le menu principal, le joueur pourra charger une sauvegarde précédente pour continuer la partie là où il s'était arrêté.

7. Interface de jeu

    Affichage des points de vie et mana : Chaque personnage, joueur et bot, aura des barres de vie et de mana visibles à l’écran.
    Journal de combat : Un log de combat peut afficher les actions prises (ex : "Le Guerrier attaque avec une frappe puissante", "Le Mage lance une boule de feu").
    Boutons d'actions : Le joueur sélectionne ses actions via des boutons cliquables. Chaque bouton correspond à une capacité.
    Animations simples : Pour donner un peu plus de vie au jeu, des petites animations peuvent être introduites, comme un effet visuel pour les sorts ou des secousses quand un coup est donné.

8. Système de progression

    Gain d’expérience : Après chaque victoire, le joueur gagne de l'expérience qui peut améliorer les stats du personnage (attaque, défense, mana, vitesse).
    Niveaux : À chaque niveau supérieur, le joueur pourrait débloquer des compétences supplémentaires ou améliorer celles existantes.

9. Difficulté croissante

    Ennemis plus forts : Après chaque victoire, le bot devient plus difficile à battre avec des actions plus stratégiques ou des statistiques améliorées.
    Boss : Tous les 5 combats, un ennemi plus puissant (boss) pourrait apparaître avec des capacités uniques et plus de points de vie.



