import Utils from "../../utils.js";
import PersonnageProvider from "../../PersonnageProvider.js";
import FavorisService from "../../FavorisService.js";

export default class PersonnageShow {
    async render() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../../../css/style_personnage.css'; // Le chemin vers le fichier CSS
        document.head.appendChild(cssLink);

        let request = Utils.parseRequestURL();
        let personnage = await PersonnageProvider.getPersonnage(request.id);
        if (!personnage) {
            return "<h2>Personnage non trouvé</h2>";
        }
        
        const isFavori = FavorisService.isFavori(personnage.id);
        
        let view = `
            <div class="personnage-container">
                <h2>Nom du Personnage : ${personnage.nom}</h2>
                <div class="personnage-stats">
                    <p><span>Classe :</span> ${personnage.classe}</p>
                    <p><span>Niveau :</span> ${personnage.niveau}</p>
                    <p><span>Points de Vie :</span> ${personnage.points_de_vie}</p>
                    <p><span>Force :</span> ${personnage.force}</p>
                    <p><span>Agilité :</span> ${personnage.agilité}</p>
                    <p><span>Intelligence :</span> ${personnage.intelligence}</p>
                </div>
                
                <div class="personnage-equipements">
                    <h3>Équipements :</h3>
                    <ul>
                        ${personnage.equipements.map(equipement => `
                            <li>${equipement.nom} (${equipement.type}) - 
                            ${equipement.type === 'arme' ? `Dégâts: ${equipement.degats}` : `Défense: ${equipement.defense}`}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="personnage-competences">
                    <h3>Compétences :</h3>
                    <ul>
                        ${personnage.competences.map(competence => `
                            <li>${competence.nom} - ${competence.description} 
                            ${competence.degats ? `- Dégâts: ${competence.degats}` : `- Effet: ${competence.effet}`}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <button id="favori-btn" data-id="${personnage.id}">
                    ${isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
                <h4><a href="#/">Retour</a></h4>
            </div>
        `;
        
        // Attacher les événements après le rendu
        setTimeout(() => {
            document.getElementById('favori-btn').addEventListener('click', () => {
                const isAdded = FavorisService.toggleFavori(personnage);
                const btn = document.getElementById('favori-btn');
                btn.textContent = isAdded ? 'Retirer des favoris' : 'Ajouter aux favoris';
            });
        }, 0);
        
        return view;
    }
}