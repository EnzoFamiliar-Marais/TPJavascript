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
        banniere.loading = "lazy";  // Lazy loading pour optimiser le chargement de la bannière

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

        const listeLabelPerso = document.createElement('div');
        listeLabelPerso.style.display = 'flex';
        listeLabelPerso.style.gap = '10px';

        // Fonction pour charger dynamiquement les images et les noms
        async function chargerImages() {
            try {
                const images = ["Voleur_de_l'Ombre.png", "mage.png", "soldat_du_nord.png"];
                const noms = ["Voleur de l'ombre", "Mage élémentaliste", "Soldat du nord"];
                images.forEach((image, index) => {
                    // Créer le lien qui contient l'image
                    const lien = document.createElement('a');
                    lien.href = `#/personnages/${index + 1}`; // La route vers la page du personnage
                    
                    // Créer l'image avec lazy loading
                    const img = document.createElement('img');
                    img.src = `../../../imgs/${image}`;
                    img.alt = noms[index];
                    img.style.display = 'block';
                    img.loading = 'lazy';
                    img.style.cursor = 'pointer';

                    // Ajouter l'image dans le lien
                    lien.appendChild(img);

                    // Créer un paragraphe pour afficher le nom de l'image
                    const p = document.createElement('p');
                    p.textContent = noms[index];
                    p.style.textAlign = 'center';
                    p.style.fontSize = '14px';
                    p.style.fontWeight = 'bold';
                    p.style.marginTop = '5px';

                    listePerso.appendChild(lien);  // Ajouter le lien avec l'image à la liste
                    listeLabelPerso.appendChild(p); // Ajouter le nom sous l'image
                });
            } catch (error) {
                console.error("Erreur lors du chargement des images :", error);
            }
        }

        // Création de deux cases pour sélectionner les personnages
        const choixContainer = document.createElement('div');
        choixContainer.id = 'choixContainer';
 
        const choix1 = document.createElement('select');
        choix1.id = 'choixPersonnage1';
        choix1.innerHTML = `
            <option value="">-- Sélectionnez un personnage --</option>
            <option value="Guerrier du Nord">Guerrier du Nord 🛡️</option>
            <option value="Mage Élémentaire">Mage Élémentaire 🔥❄️</option>
            <option value="Voleur de l’Ombre">Voleur de l’Ombre 🗡️</option>
            <option value="Archer Elfique">Archer Elfique 🏹</option>
            <option value="Nécromancien Maudit">Nécromancien Maudit ☠️</option>
            <option value="Samouraï Errant">Samouraï Errant 🏯</option>
            <option value="Cyborg du Futur">Cyborg du Futur 🤖</option>
        `;
 
        const choix2 = document.createElement('select');
        choix2.id = 'choixPersonnage2';
        choix2.innerHTML = `
            <option value="">-- Sélectionnez un personnage --</option>
            <option value="Guerrier du Nord">Guerrier du Nord 🛡️</option>
            <option value="Mage Élémentaire">Mage Élémentaire 🔥❄️</option>
            <option value="Voleur de l’Ombre">Voleur de l’Ombre 🗡️</option>
            <option value="Archer Elfique">Archer Elfique 🏹</option>
            <option value="Nécromancien Maudit">Nécromancien Maudit ☠️</option>
            <option value="Samouraï Errant">Samouraï Errant 🏯</option>
            <option value="Cyborg du Futur">Cyborg du Futur 🤖</option>
        `;
 
        choixContainer.appendChild(choix1);
        choixContainer.appendChild(choix2);
 
        // Création du bouton "Combat"
        const boutonCombat = document.createElement('button');
        boutonCombat.textContent = 'Lancer le Combat';
        boutonCombat.id = 'boutonCombat';
        boutonCombat.addEventListener('click', () => {
            const personnage1 = document.getElementById('choixPersonnage1').value;
            const personnage2 = document.getElementById('choixPersonnage2').value;
 
            if (personnage1 && personnage2) {
                // Rediriger vers une nouvelle page JS (par exemple, la page de combat)
                window.location.href = `combat.html?perso1=${encodeURIComponent(personnage1)}&perso2=${encodeURIComponent(personnage2)}`;
            } else {
                alert('Veuillez choisir deux personnages avant de lancer le combat.');
            }
        });

        await chargerImages(); // Charger les images et leurs noms

        persoJeu.appendChild(titrePerso);
        persoJeu.appendChild(listePerso); // Ajouter la liste des personnages
        persoJeu.appendChild(listeLabelPerso); 
        persoJeu.appendChild(choixContainer);
        persoJeu.appendChild(boutonCombat);

        documentationJeu.appendChild(persoJeu);

        return documentationJeu.outerHTML;
    }
}