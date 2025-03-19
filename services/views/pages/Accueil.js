export default class Accueil {
    async render() {
        const documentationJeu = document.createElement('div');
        documentationJeu.id = "documentationJeu";

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

        documentationJeu.appendChild(titreDoc);
        documentationJeu.appendChild(contenuDoc);
        documentationJeu.appendChild(listeDoc);

        return documentationJeu.outerHTML;
    }
}
