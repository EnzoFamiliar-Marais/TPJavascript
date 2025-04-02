import PersonnageProvider from '../../PersonnageProvider.js';
import CombatService from '../../CombatService.js';
import Utils from '../../utils.js';

export default class CombatPage {
    async render() {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = '../../../css/style_combat.css';
        document.head.appendChild(cssLink);

        // Utiliser getUrlParams de Utils
        const params = Utils.getUrlParams();
        const perso1Id = params.get('perso1');
        const perso2Id = params.get('perso2');
        
        console.log("IDs récupérés:", perso1Id, perso2Id);
        
        // Récupérer tous les personnages
        const personnages = await PersonnageProvider.getPersonnages(20);
        
        if (perso1Id && perso2Id) {
            return this.renderCombatView(perso1Id, perso2Id);
        }
        
        if (perso1Id) {
            return this.renderPerso2Selection(personnages, perso1Id);
        }
        
        return this.renderPerso1Selection(personnages);
    }
    
    renderPerso1Selection(personnages) {
        return `
            <div class="container">
                <h1>Combat - Choisir votre combattant</h1>
                <div class="row">
                    <div class="col-12">
                        <h2>Personnage 1</h2>
                        <ul class="personnages-liste">
                            ${personnages.map(personnage => `
                                <li class="personnage-item">
                                    <div class="personnage-card">
                                        <h3>${personnage.nom}</h3>
                                        <p>Classe: ${personnage.classe} | Niveau: ${personnage.niveau}</p>
                                        <p>PV: ${personnage.points_de_vie} | Force: ${personnage.force}</p>
                                        <a href="#/combat?perso1=${personnage.id}" class="btn-select">Choisir</a>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <a href="#/" class="btn-back">Retour à l'accueil</a>
            </div>
        `;
    }
    
    renderPerso2Selection(personnages, perso1Id) {
        const perso1 = personnages.find(p => String(p.id) === String(perso1Id));
        
        if (!perso1) {
            return `
                <h2>Erreur: Personnage non trouvé</h2>
                <p>ID: ${perso1Id}</p>
                <a href="#/combat">Retour à la sélection</a>
            `;
        }
        
        const adversaires = personnages.filter(p => String(p.id) !== String(perso1Id));
        
        return `
            <div class="container">
                <h1>Combat - Choisir l'adversaire</h1>
                <div class="row">
                    <div class="col-4">
                        <h2>Votre combattant</h2>
                        <div class="personnage-selected">
                            <h3>${perso1.nom}</h3>
                            <p>Classe: ${perso1.classe} | Niveau: ${perso1.niveau}</p>
                            <p>PV: ${perso1.points_de_vie} | Force: ${perso1.force}</p>
                        </div>
                    </div>
                    <div class="col-8">
                        <h2>Choisissez votre adversaire</h2>
                        <ul class="personnages-liste">
                            ${adversaires.map(personnage => `
                                <li class="personnage-item">
                                    <div class="personnage-card">
                                        <h3>${personnage.nom}</h3>
                                        <p>Classe: ${personnage.classe} | Niveau: ${personnage.niveau}</p>
                                        <p>PV: ${personnage.points_de_vie} | Force: ${personnage.force}</p>
                                        <a href="#/combat?perso1=${perso1Id}&perso2=${personnage.id}" class="btn-select">Combattre</a>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <a href="#/combat" class="btn-back">Choisir un autre personnage</a>
            </div>
        `;
    }
    
    async renderCombatView(perso1Id, perso2Id) {
        try {
            // Récupérer directement les personnages par leurs IDs
            const perso1 = await PersonnageProvider.getPersonnage(perso1Id);
            const perso2 = await PersonnageProvider.getPersonnage(perso2Id);
            
            console.log("Personnage 1:", perso1);
            console.log("Personnage 2:", perso2);
            
            if (!perso1 || !perso2) {
                return `<h2>Erreur: Un des personnages n'a pas été trouvé</h2>
                        <p>IDs: ${perso1Id}, ${perso2Id}</p>
                        <a href="#/combat">Retour à la sélection</a>`;
            }
            
            return `
                <div class="container combat-arena">
                    <h1>Combat</h1>
                    <div class="combattants">
                        <div class="combattant perso1">
                            <h2>${perso1.nom}</h2>
                            <p>Classe: ${perso1.classe} | Niveau: ${perso1.niveau}</p>
                            <div class="stats">
                                <div class="hp">PV: <span id="pv-perso1">${perso1.points_de_vie}</span></div>
                                <div class="force">Force: ${perso1.force}</div>
                                <div class="agilite">Agilité: ${perso1.agilité}</div>
                                <div class="intelligence">Intelligence: ${perso1.intelligence}</div>
                            </div>
                            <div class="actions">
                                <h3>Compétences</h3>
                                <ul class="competences">
                                    ${perso1.competences.map(comp => `
                                        <li>
                                            <button class="comp-btn" data-perso="perso1" data-comp-id="${comp.id}">
                                                ${comp.nom} ${comp.degats ? `(Dégâts: ${comp.degats})` : comp.effet ? `(Effet: ${comp.effet})` : ''}
                                            </button>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="combat-log">
                            <h3>Combat Log</h3>
                            <div id="log-container"></div>
                            <button id="start-combat" class="btn-fight">Lancer le combat</button>
                        </div>
                        
                        <div class="combattant perso2">
                            <h2>${perso2.nom}</h2>
                            <p>Classe: ${perso2.classe} | Niveau: ${perso2.niveau}</p>
                            <div class="stats">
                                <div class="hp">PV: <span id="pv-perso2">${perso2.points_de_vie}</span></div>
                                <div class="force">Force: ${perso2.force}</div>
                                <div class="agilite">Agilité: ${perso2.agilité}</div>
                                <div class="intelligence">Intelligence: ${perso2.intelligence}</div>
                            </div>
                            <div class="actions">
                                <h3>Compétences</h3>
                                <ul class="competences">
                                    ${perso2.competences.map(comp => `
                                        <li>
                                            <button class="comp-btn" data-perso="perso2" data-comp-id="${comp.id}">
                                                ${comp.nom} ${comp.degats ? `(Dégâts: ${comp.degats})` : comp.effet ? `(Effet: ${comp.effet})` : ''}
                                            </button>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#/combat" class="btn-back">Retour à la sélection</a>
            `;
        } catch (error) {
            console.error("Erreur lors du chargement des personnages:", error);
            return `<h2>Erreur lors du chargement des personnages</h2>
                    <p>${error.message}</p>
                    <a href="#/combat">Retour à la sélection</a>`;
        }
    }
    
    async after_render() {
        try {
            const params = Utils.getUrlParams();
            const perso1Id = params.get('perso1');
            const perso2Id = params.get('perso2');
            
            console.log("after_render - IDs:", perso1Id, perso2Id);
            
            if (perso1Id && perso2Id) {
                const perso1 = await PersonnageProvider.getPersonnage(perso1Id);
                const perso2 = await PersonnageProvider.getPersonnage(perso2Id);
                
                if (perso1 && perso2) {
                    const startButton = document.getElementById('start-combat');
                    console.log("Bouton de combat:", startButton);
                    
                    if (startButton) {
                        startButton.addEventListener('click', () => {
                            console.log("Début du combat entre", perso1.nom, "et", perso2.nom);
                            this.startCombat(perso1, perso2);
                        });
                    } else {
                        console.error("Bouton de combat non trouvé");
                    }
                } else {
                    console.error("Personnages non trouvés:", perso1, perso2);
                }
            }
        } catch (error) {
            console.error("Erreur dans after_render:", error);
        }
    }
    
    async startCombat(perso1, perso2) {
        try {
            const logContainer = document.getElementById('log-container');
            const pvPerso1 = document.getElementById('pv-perso1');
            const pvPerso2 = document.getElementById('pv-perso2');
            
            if (!logContainer || !pvPerso1 || !pvPerso2) {
                console.error("Éléments du DOM manquants");
                return;
            }
            
            logContainer.innerHTML = '';
            
            document.getElementById('start-combat').disabled = true;
            
            const result = await CombatService.simulerCombat(perso1, perso2);
            console.log("Résultat du combat:", result);
            
            for (let i = 0; i < result.logs.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 500)); 
                
                const log = document.createElement('p');
                log.textContent = result.logs[i];
                logContainer.appendChild(log);
                logContainer.scrollTop = logContainer.scrollHeight;
                
                if (result.pvParTour && result.pvParTour[i]) {
                    pvPerso1.textContent = result.pvParTour[i].pv1;
                    pvPerso2.textContent = result.pvParTour[i].pv2;
                }
            }
            
            const resultatFinal = document.createElement('h3');
            resultatFinal.className = 'resultat-final';
            resultatFinal.textContent = `Vainqueur: ${result.vainqueur.nom}!`;
            logContainer.appendChild(resultatFinal);
            
            document.getElementById('start-combat').disabled = false;
            document.getElementById('start-combat').textContent = "Rejouer";
        } catch (error) {
            console.error("Erreur pendant le combat:", error);
            const logContainer = document.getElementById('log-container');
            if (logContainer) {
                logContainer.innerHTML = `<p class="error">Erreur pendant le combat: ${error.message}</p>`;
            }
            document.getElementById('start-combat').disabled = false;
        }
    }
}
