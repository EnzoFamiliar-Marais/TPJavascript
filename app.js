import Utils from './services/utils.js';
import PersonnagesAll from './services/views/pages/AllPerso.js';

const routes = {
    '/': PersonnagesAll,
    '/personnages': PersonnagesAll,
};

const router = async () => {
    const content = null || document.querySelector("#content");
    let request = Utils.parseRequestURL();
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let page = routes[parsedURL] || Error404;
    console.log(parsedURL);
    console.log(page);
    console.log(page.render());
    content.innerHTML = await page.render();
}


window.addEventListener('load', router);
window.addEventListener('hashchange', router);