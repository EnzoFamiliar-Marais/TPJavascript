import PersonnageProvider from "../../PersonnageProvider.js";
import FavorisService from "../../FavorisService.js";

export default class PersonnagesAll {
    async render() {
        let personnages = await PersonnageProvider.getPersonnages(20);
        let view = `
            <h2>Personnages : </h2>
            <nav>
                <a href="#/favoris">Voir mes favoris</a>
            </nav>
            <input type="text" id="search" placeholder="Rechercher un personnage">
            <button id="searchButton">Rechercher</button>
            <ul>
                ${personnages.map(personnage => {
                    const isFavori = FavorisService.isFavori(personnage.id);
                    return `
                    <li>
                        ${personnage.nom} ${isFavori ? '⭐' : ''} 
                        <a href="#/personnages/${personnage.id}">Voir</a>
                    </li>
                    `;
                }).join('\n')}
            </ul>
        `;
        
        setTimeout(() => {
            document.getElementById('searchButton').addEventListener('click', () => {
                const searchTerm = document.getElementById('search').value.toLowerCase();
                const filteredPersonnages = personnages.filter(p => 
                    p.nom.toLowerCase().includes(searchTerm)
                );
                
                const list = document.querySelector('ul');
                list.innerHTML = filteredPersonnages.map(personnage => {
                    const isFavori = FavorisService.isFavori(personnage.id);
                    return `
                    <li>
                        ${personnage.nom} ${isFavori ? '⭐' : ''} 
                        <a href="#/personnages/${personnage.id}">Voir</a>
                    </li>
                    `;
                }).join('\n');
            });
        }, 0);
        
        return view;
    }
}


