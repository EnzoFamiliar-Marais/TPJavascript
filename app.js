import Utils from './services/utils.js';
import PersonnagesAll from './services/views/pages/PersonnagesAll.js';
import PersonnageShow from './services/views/pages/PersonnageShow.js';
import Accueil from './services/views/pages/Accueil.js'
import FavorisPage from './services/views/pages/FavorisPage.js';
import CombatPage from './services/views/pages/CombatPage.js';

const routes = {
    '/': Accueil,
    '/personnages': PersonnagesAll,
    '/personnages/:id': PersonnageShow,
    '/favoris': FavorisPage,
    '/combat': CombatPage,
};

const Error404 = {
    async render() {
        return "<h2>404 Not Found</h2>";
    }
}

const router = async () => {
    const content = null || document.querySelector("#content");
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let pageClass = routes[parsedURL] || Error404;
    let page = pageClass === Error404 ? Error404 : new pageClass();
    content.innerHTML = await page.render();

    if (page.after_render) {
        await page.after_render();
    }
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);