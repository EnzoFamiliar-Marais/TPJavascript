import Utils from './services/utils.js';
import PersonnagesAll from './services/views/pages/AllPerso.js';
import PersonnageShow from './services/views/pages/PersonnageShow.js';

const routes = {
    '/': PersonnagesAll,
    '/personnages': PersonnagesAll,
    '/personnages/:id': PersonnageShow,
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
}

window.addEventListener('load', router);
window.addEventListener('hashchange', router);