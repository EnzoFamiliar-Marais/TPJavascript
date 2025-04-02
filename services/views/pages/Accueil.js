import FavorisService from "../../FavorisService.js";  
import PersonnageProvider from "../../PersonnageProvider.js";

export default class Accueil {
    async render() {
        // Ajout du fichier CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../../../css/style_accueil.css';
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

        listeDoc.appendChild(elementDoc1);
        listeDoc.appendChild(elementDoc2);
        listeDoc.appendChild(elementDoc3);

        documentationJeu.appendChild(banniere);
        documentationJeu.appendChild(titreDoc);
        documentationJeu.appendChild(contenuDoc);
        documentationJeu.appendChild(listeDoc);

        // Section des personnages
        const persoJeu = document.createElement('div');
        persoJeu.id = "persoJeu";

        const titrePerso = document.createElement('h2');
        titrePerso.textContent = 'Personnages';

        const listePerso = document.createElement('div');
        listePerso.id = "listePerso";

        const listeLabelPerso = document.createElement('div');
        listeLabelPerso.id = "listeLabelPerso";  

        async function chargerImages() {
            try {
                const persos = await PersonnageProvider.getPersonnages(6);
                persos.forEach(perso => {
                    const lien = document.createElement('a');
                    lien.href = `#/personnages/${perso['id']}`;
                    lien.style.textDecoration = 'none';
                    
                    const img = document.createElement('img');
                    img.id = 'perso';
                    img.src = perso['img'];
                    img.alt = perso['nom'];
                    img.loading = "lazy";

                    const p = document.createElement('p');
                    p.textContent = perso['nom'];

                    listePerso.appendChild(lien);
                    listeLabelPerso.appendChild(p);

                    const isFavori = FavorisService.isFavori(perso['id']);
                    if (isFavori) {
                        const heart = document.createElement('span');
                        heart.textContent = '❤️';
                        heart.classList.add('favori');
                        lien.appendChild(heart);
                    }
                    lien.appendChild(img);
                });
            } catch (error) {
                console.error("Erreur lors du chargement des images :", error);
            }
        }

        // Bouton de combat
        const boutonCombat = document.createElement('a');
        boutonCombat.textContent = 'Jouer';
        boutonCombat.href = '#/combat';
        boutonCombat.id = 'boutonCombat';

        const combatContainer = document.createElement('div');
        combatContainer.id = 'combatContainer';
        combatContainer.appendChild(boutonCombat);

        await chargerImages();

        persoJeu.appendChild(titrePerso);
        persoJeu.appendChild(listePerso);
        persoJeu.appendChild(listeLabelPerso); 
        persoJeu.appendChild(combatContainer);

        documentationJeu.appendChild(persoJeu);

        return documentationJeu.outerHTML;
    }
}
