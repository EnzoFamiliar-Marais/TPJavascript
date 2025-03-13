import Utils from "../../utils.js";
import PersonnageProvider from "../../PersonnageProvider.js";

export default class Index {
    async render() {
        return `
            <h2>Accueil</h2>
            <p>Bienvenue sur notre site de gestion de personnages !</p>
            <p>Vous pouvez consulter la liste des personnages <a href="/#/personnages">ici</a></p>
        `;
    }
}