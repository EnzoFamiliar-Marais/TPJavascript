export default class Accueil {
    async render() {
        // Charger le fichier CSS dynamiquement
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../../../css/style_accueil.css'; // Le chemin vers le fichier CSS
        document.head.appendChild(cssLink);

        // Création de la documentation du jeu
        const documentationJeu = document.createElement('div');
        documentationJeu.id = "documentationJeu";

        const banniere = document.createElement('img');
        banniere.src = `../../../imgs/Banniere.png`;
        banniere.alt = "image";
        banniere.loading = "lazy";

        const titreDoc = document.createElement('h2');
        titreDoc.textContent = 'Guide du joueur';

        const contenuDoc = document.createElement('p');
        contenuDoc.textContent = 'Bienvenue dans notre jeu de rôle au tour par tour ! Voici un bref aperçu du jeu :';

        const listeDoc = document.createElement('ul');

        const elementDoc1 = document.createElement('li');
        elementDoc1.textContent = `
        1. Choix des classes : 
            - Guerrier du Nord 🛡️, Mage Élémentaire 🔥❄️, Voleur de l’Ombre 🗡️, Archer Elfique 🏹, 
              Nécromancien Maudit ☠️, Samouraï Errant 🏯 et Cyborg du Futur 🤖.
        `;

        const elementDoc2 = document.createElement('li');
        elementDoc2.textContent = `
        2. Combat : 
            - Chaque personnage a 4 actions spécifiques basées sur sa classe, et vous combattrez des adversaires contrôlés par l'IA.
            - Le combat est au tour par tour, où chaque joueur et bot peut exécuter une action contre un coût en mana.
        `;

        const elementDoc3 = document.createElement('li');
        elementDoc3.textContent = `
        3. Ramassage d'objets :
            - Pendant le combat, ramassez des objets pour améliorer vos statistiques et capacités.
        `;

        // Ajout des éléments à la documentation
        listeDoc.appendChild(elementDoc1);
        listeDoc.appendChild(elementDoc2);
        listeDoc.appendChild(elementDoc3);

        documentationJeu.appendChild(banniere);
        documentationJeu.appendChild(titreDoc);
        documentationJeu.appendChild(contenuDoc);
        documentationJeu.appendChild(listeDoc);

        // Ajout de la section des personnages
        const persoJeu = document.createElement('div');
        persoJeu.id = "persoJeu";

        const titrePerso = document.createElement('h2');
        titrePerso.textContent = 'Personnages';

        const listePerso = document.createElement('div');
        listePerso.style.display = 'flex';
        listePerso.style.gap = '10px';

        // Fonction pour charger dynamiquement les images
        async function chargerImages() {
            try {
                const images = ["Voleur_de_l'Ombre.png", "mage.png", "soldat_du_nord.png"];

                images.forEach(image => {
                    const img = document.createElement('img');
                    img.src = `../../../imgs/${image}`;
                    img.alt = image;
                    listePerso.appendChild(img);
                });
            } catch (error) {
                console.error("Erreur lors du chargement des images :", error);
            }
        }

        await chargerImages();

        persoJeu.appendChild(titrePerso);
        persoJeu.appendChild(listePerso);

        documentationJeu.appendChild(persoJeu);

        return documentationJeu.outerHTML;
    }
}