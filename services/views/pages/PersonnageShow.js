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
        console.log(personnage);

        if (!personnage) {
            return "<h2>Personnage non trouvé</h2>";
        }
        
        const isFavori = FavorisService.isFavori(personnage.id);
        
        let view = `
            <h2>Nom du Personnage : ${personnage.nom}</h2>
            <p>Classe : ${personnage.classe}</p>
            <p>Niveau : ${personnage.niveau}</p>
            <p>Points de Vie : ${personnage.points_de_vie}</p>
            <p>Force : ${personnage.force}</p>
            <p>Agilité : ${personnage.agilité}</p>
            <p>Intelligence : ${personnage.intelligence}</p>
            <h3>Équipements :</h3>
            <ul>
            ${personnage.equipements.map(equipement => `
                <li>${equipement.nom} (${equipement.type}) - ${
                    equipement.type === 'arme' 
                        ? `Dégâts: ${equipement.degats || equipement.degats_magiques || "Non spécifié"}`
                        : `Défense: ${equipement.defense || equipement.effet || "Non spécifié"}`
                }</li>
            `).join('')}
            </ul>
            <h3>Compétences :</h3>
            <ul>
            ${personnage.competences.map(competence => `
                <li>${competence.nom} - ${competence.description} ${competence.degats ? `- Dégâts: ${competence.degats}` : `- Effet: ${competence.effet}`}</li>
            `).join('')}
            </ul>
            <button id="favori-btn" data-id="${personnage.id}">${isFavori ? 'Retirer des favoris' : 'Ajouter aux favoris'}</button>
            <h4><a href="#/">Retour</a></h4>
        `;
        
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