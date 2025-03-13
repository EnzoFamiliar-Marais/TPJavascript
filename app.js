import Utils from './services/utils.js';
import PersonnagesAll from './services/views/pages/AllPerso.js';
import Index from './services/views/pages/Index.js';
import PersonnageShow from './services/views/pages/PersonnageShow.js';

const routes = {
    '/': Index,
    '/personnages': PersonnagesAll,
    '/personnages/:id': PersonnageShow,
};

const Error404 = {
    async render() {
        return "<h2>404 Not Found</h2>";
    }
}

const router = async () => { 
    const content = document.querySelector("#content");
    let request = Utils.parseRequestURL();
    
    let parsedURL = 
        (request.resource ? '/' + request.resource : '/') + 
        (request.id ? '/:id' : '') + 
        (request.verb ? '/' + request.verb : '');
    
    if (parsedURL.startsWith("/search")) {
        let searchQuery = decodeURIComponent(request.id || "");
        let results = PersonnagesAll.filter(personnage => 
            personnage.name.toLowerCase().includes(searchQuery)
        );

        content.innerHTML = results.length > 0 
            ? results.map(personnage => `<div>${personnage.name}</div>`).join('')
            : "<h2>Aucun personnage trouvé</h2>";

        return;
    }
    let pageClass = routes[parsedURL] || Error404;
    let page = new pageClass();
    content.innerHTML = await page.render();
    };

const handleSearch = (event) => {
    event.preventDefault();

    let search = document.querySelector("#search").value.trim().toLowerCase();

    if (search) {
        window.location.hash = `#/search/${search}`;
    } else {
        window.location.hash = `#/personnages`;
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
document.querySelector("#searchForm").addEventListener("submit", handleSearch);