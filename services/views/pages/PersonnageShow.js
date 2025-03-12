import Utils from "../../utils.js";
import PersonnageProvider from "../../PersonnageProvider.js";

export default class PersonnageShow {
    async render() {
        let request = Utils.parseRequestURL();
        let personnage = await PersonnageProvider.getPersonnage(request.id);
        if (!personnage) {
            return "<h2>Personnage non trouvé</h2>";
        }
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
                <li>${equipement.nom} (${equipement.type}) - ${equipement.type === 'arme' ? `Dégâts: ${equipement.degats}` : `Défense: ${equipement.defense}`}</li>
            `).join('')}
            </ul>
            <h3>Compétences :</h3>
            <ul>
            ${personnage.competences.map(competence => `
                <li>${competence.nom} - ${competence.description} ${competence.degats ? `- Dégâts: ${competence.degats}` : `- Effet: ${competence.effet}`}</li>
            `).join('')}
            </ul>
        `;
        return view;
    }
}