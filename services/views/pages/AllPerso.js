import PersonnageProvider from "../../PersonnageProvider.js";

export default class PersonnagesAll {
    async render() {
        let personnages = await PersonnageProvider.getPersonnages(20);
        let view = `
            <h2>Personnages : </h2>
            <ul>
                ${personnages.map(personnage => `
                    <li>
                        ${personnage.nom} 
                        <a href="#/personnages/${personnage.id}">Voir</a>
                    </li>
                    `).join('\n')}
            </ul>
        `;
        return view;
    }
}


