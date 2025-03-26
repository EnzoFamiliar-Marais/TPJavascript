import FavorisService from "../../FavorisService.js";

export default class FavorisPage {
    async render() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../../../css/style_favoris.css'; // Le chemin vers le fichier CSS
        document.head.appendChild(cssLink);

        const favoris = FavorisService.getFavoris();
        
        if (favoris.length === 0) {
            return `
                <h2>Mes favoris</h2>
                <p>Vous n'avez pas encore de favoris.</p>
                <a href="#/">Retour à l'accueil</a>
            `;
        }
        
        let view = `
            <h2>Mes favoris</h2>
            <ul>
                ${favoris.map(personnage => `
                    <li>
                        ${personnage.nom} 
                        <a href="#/personnages/${personnage.id}">Voir</a>
                        <button class="remove-favori" data-id="${personnage.id}">Retirer</button>
                    </li>
                `).join('\n')}
            </ul>
            <a href="#/">Retour à l'accueil</a>
        `;
        
        setTimeout(() => {
            document.querySelectorAll('.remove-favori').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const personnage = favoris.find(p => p.id === id);
                    if (personnage) {
                        FavorisService.toggleFavori(personnage);
                        window.location.reload();
                    }
                });
            });
        }, 0);
        
        return view;
    }
}
