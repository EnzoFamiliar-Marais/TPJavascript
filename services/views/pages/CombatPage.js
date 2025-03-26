import PersonnageProvider from '../../PersonnageProvider.js';
import CombatService from '../../CombatService.js';
import Utils from '../../utils.js';

export default class CombatPage {
    async render() {
        // Modification: Méthode améliorée pour récupérer les paramètres d'URL
        const hash = window.location.hash;
        let perso1Id = null;
        let perso2Id = null;
        
        // Extraction des paramètres depuis le hash
        if (hash.includes('?')) {
            const paramsString = hash.split('?')[1];
            const searchParams = new URLSearchParams(paramsString);
            perso1Id = searchParams.get('perso1');
            perso2Id = searchParams.get('perso2');
        }
        
        // Récupérer tous les personnages
        const personnages = await PersonnageProvider.getPersonnages(20);
        
        if (perso1Id && perso2Id) {
            return this.renderCombatView(personnages, perso1Id, perso2Id);
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
        const perso1 = personnages.find(p => p.id === perso1Id);
        const adversaires = personnages.filter(p => p.id !== perso1Id);
        
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
    
    async renderCombatView(personnages, perso1Id, perso2Id) {
        // Récupérer les personnages complets
        const perso1 = await PersonnageProvider.getPersonnage(perso1Id);
        const perso2 = await PersonnageProvider.getPersonnage(perso2Id);
        
        if (!perso1 || !perso2) {
            return `<h2>Erreur: Un des personnages n'a pas été trouvé</h2>
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
                
                <a href="#/combat" class="btn-back">Retour à la sélection</a>
            </div>
        `;
    }
    
    async after_render() {
        // Modification: Même méthode pour récupérer les paramètres depuis le hash
        const hash = window.location.hash;
        let perso1Id = null;
        let perso2Id = null;
        
        if (hash.includes('?')) {
            const paramsString = hash.split('?')[1];
            const searchParams = new URLSearchParams(paramsString);
            perso1Id = searchParams.get('perso1');
            perso2Id = searchParams.get('perso2');
        }
        
        if (perso1Id && perso2Id) {
            const perso1 = await PersonnageProvider.getPersonnage(perso1Id);
            const perso2 = await PersonnageProvider.getPersonnage(perso2Id);
            
            const startButton = document.getElementById('start-combat');
            if (startButton) {
                startButton.addEventListener('click', () => {
                    this.startCombat(perso1, perso2);
                });
            }
        }
    }
    
    async startCombat(perso1, perso2) {
        const logContainer = document.getElementById('log-container');
        const pvPerso1 = document.getElementById('pv-perso1');
        const pvPerso2 = document.getElementById('pv-perso2');
        
        // Désactiver le bouton de combat
        document.getElementById('start-combat').disabled = true;
        
        // Simuler le combat
        const result = await CombatService.simulerCombat(perso1, perso2);
        
        // Afficher les logs et mettre à jour les PV au fur et à mesure
        for (let i = 0; i < result.logs.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Délai pour la visualisation
            
            // Ajouter le log
            const log = document.createElement('p');
            log.textContent = result.logs[i];
            logContainer.appendChild(log);
            logContainer.scrollTop = logContainer.scrollHeight;
            
            // Mettre à jour les PV
            if (result.pvParTour && result.pvParTour[i]) {
                pvPerso1.textContent = result.pvParTour[i].pv1;
                pvPerso2.textContent = result.pvParTour[i].pv2;
            }
        }
        
        // Afficher le résultat final
        const resultatFinal = document.createElement('h3');
        resultatFinal.className = 'resultat-final';
        resultatFinal.textContent = `Vainqueur: ${result.vainqueur.nom}!`;
        logContainer.appendChild(resultatFinal);
        
        // Réactiver le bouton pour rejouer
        document.getElementById('start-combat').disabled = false;
        document.getElementById('start-combat').textContent = "Rejouer";
    }
}
