import FavorisService from "../../FavorisService.js";

export default class FavorisPage {
    async render() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../../../css/style_favoris.css'; // Chemin vers le fichier CSS spécifique
        document.head.appendChild(cssLink);

        const favoris = FavorisService.getFavoris();
        
        if (favoris.length === 0) {
            return `
                <div class="favoris-container">
                    <h2 class="favoris-title">Mes favoris</h2>
                    <p class="favoris-empty">Vous n'avez pas encore de favoris.</p>
                    <a href="#/" class="favoris-home">Retour à l'accueil</a>
                </div>
            `;
        }
        
        let view = `
            <div class="favoris-container">
                <h2 class="favoris-title">Mes favoris</h2>
                <ul class="favoris-list">
                    ${favoris.map(personnage => `
                        <li class="favoris-item">
                            <span class="favoris-name">${personnage.nom}</span>
                            <a href="#/personnages/${personnage.id}" class="favoris-link">Voir</a>
                            <button class="favoris-remove" data-id="${personnage.id}">Retirer</button>
                        </li>
                    `).join('\n')}
                </ul>
                <a href="#/" class="favoris-home">Retour à l'accueil</a>
            </div>
        `;
        
        setTimeout(() => {
            document.querySelectorAll('.favoris-remove').forEach(btn => {
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
