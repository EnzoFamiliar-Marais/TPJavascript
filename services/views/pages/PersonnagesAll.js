import PersonnageProvider from "../../PersonnageProvider.js";
import FavorisService from "../../FavorisService.js";
import FormulaireAdd from "../../FormulaireAdd.js";

export default class PersonnagesAll {
    async render() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../../../css/style_perso_all.css';
        document.head.appendChild(cssLink);

        let personnages = await PersonnageProvider.getPersonnages(20);
        let view = `
            <div class="personnages-container">
                <div class="personnages-header">
                    <h2>Personnages</h2>
                    <a href="#/ajouter" class="btn-add">Ajouter un personnage</a>
                </div>
                <nav>
                    <a href="#/favoris">Voir mes favoris</a>
                </nav>
                <input type="text" id="search" placeholder="Rechercher un personnage">
                <button id="searchButton">Rechercher</button>
                <ul class="personnages-list">
                    ${personnages.map(personnage => {
                        const isFavori = FavorisService.isFavori(personnage.id);
                        return `
                        <li class="personnage-item">
                            <span class="personnage-nom">${personnage.nom}</span>
                            <span class="personnage-classe">${personnage.classe}</span>
                            <span class="personnage-niveau">Niveau ${personnage.niveau}</span>
                            ${isFavori ? '⭐' : ''} 
                            <a href="#/personnages/${personnage.id}" class="btn-view">Voir</a>
                        </li>
                        `;
                    }).join('\n')}
                </ul>
            </div>
        `;
        
        return view;
    }
    
    async after_render() {
        await FormulaireAdd.recherche(personnages);
    }
}


