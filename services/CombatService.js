import { ENDPOINT } from "../config.js";

export default class CombatService {
    static KEY_HISTORIQUE = 'combat_historique';
    
    static getHistorique() {
        const historiqueJson = localStorage.getItem(this.KEY_HISTORIQUE);
        return historiqueJson ? JSON.parse(historiqueJson) : [];
    }
    
    static sauvegarderHistorique(combat) {
        const historique = this.getHistorique();
        historique.push({
            ...combat,
            date: new Date().toISOString()
        });
        localStorage.setItem(this.KEY_HISTORIQUE, JSON.stringify(historique));
    }
    
    static calculerDegats(attaquant, defenseur, competence) {
        let degatsBase = competence.degats || 0;
        degatsBase += Math.floor(attaquant.force * 0.5);
        
        // enlever la défense de l'
        let defense = 0;
        if (defenseur.equipements) {
            defense = defenseur.equipements
                .filter(eq => eq.type === 'armure')
                .reduce((total, eq) => total + eq.defense, 0);
        }
        
        const degatsFinaux = Math.max(1, degatsBase - defense);
        
        const chanceCritique = Math.min(0.05 + (attaquant.agilité / 100), 0.25); // max 25%
        const estCritique = Math.random() < chanceCritique;
        
        return {
            degats: estCritique ? Math.floor(degatsFinaux * 1.5) : degatsFinaux,
            critique: estCritique
        };
    }
    
    static choisirCompetenceAleatoire(personnage) {
        const competencesOffensives = personnage.competences.filter(c => c.degats && c.degats > 0);
        
        if (competencesOffensives.length === 0) {
            return {
                id: 'basic',
                nom: "Attaque basique",
                degats: 5,
                description: "Une attaque simple"
            };
        }
        
        const index = Math.floor(Math.random() * competencesOffensives.length);
        return competencesOffensives[index];
    }
    
    static async simulerCombat(personnage1, personnage2) {
        let pv1 = personnage1.points_de_vie;
        let pv2 = personnage2.points_de_vie;
        
        const logs = [];
        const pvParTour = [];
        let tour = 0;
        
        // on fait le combat tant que les deux personnages ont des points de vie
        while (pv1 > 0 && pv2 > 0 && tour < 20) { // max 20 tours
            tour++;
            
            // c'est aléatoit qui commence avec son agilité
            const agilite1 = personnage1.agilité || 0;
            const agilite2 = personnage2.agilité || 0;
            const perso1AttaqueEnPremier = Math.random() < (agilite1 / (agilite1 + agilite2));
            
            if (perso1AttaqueEnPremier) {
                // perso 1 attaque
                const competence1 = this.choisirCompetenceAleatoire(personnage1);
                const resultat1 = this.calculerDegats(personnage1, personnage2, competence1);
                pv2 -= resultat1.degats;
                
                logs.push(`Tour ${tour}: ${personnage1.nom} utilise ${competence1.nom} et inflige ${resultat1.degats} points de dégâts à ${personnage2.nom}${resultat1.critique ? ' (Critique!)' : ''}`);
                pvParTour.push({ pv1, pv2: Math.max(0, pv2) });
                
                if (pv2 <= 0) {
                    logs.push(`${personnage2.nom} est vaincu!`);
                    break;
                }
                
                // perso 2 riposte
                const competence2 = this.choisirCompetenceAleatoire(personnage2);
                const resultat2 = this.calculerDegats(personnage2, personnage1, competence2);
                pv1 -= resultat2.degats;
                
                logs.push(`Tour ${tour}: ${personnage2.nom} riposte avec ${competence2.nom} et inflige ${resultat2.degats} points de dégâts à ${personnage1.nom}${resultat2.critique ? ' (Critique!)' : ''}`);
                pvParTour.push({ pv1: Math.max(0, pv1), pv2: Math.max(0, pv2) });
                
                if (pv1 <= 0) {
                    logs.push(`${personnage1.nom} est vaincu!`);
                    break;
                }
            } else {
                // Personnage 2 attaque
                const competence2 = this.choisirCompetenceAleatoire(personnage2);
                const resultat2 = this.calculerDegats(personnage2, personnage1, competence2);
                pv1 -= resultat2.degats;
                
                logs.push(`Tour ${tour}: ${personnage2.nom} utilise ${competence2.nom} et inflige ${resultat2.degats} points de dégâts à ${personnage1.nom}${resultat2.critique ? ' (Critique!)' : ''}`);
                pvParTour.push({ pv1: Math.max(0, pv1), pv2 });
                
                if (pv1 <= 0) {
                    logs.push(`${personnage1.nom} est vaincu!`);
                    break;
                }
                
                // Personnage 1 riposte
                const competence1 = this.choisirCompetenceAleatoire(personnage1);
                const resultat1 = this.calculerDegats(personnage1, personnage2, competence1);
                pv2 -= resultat1.degats;
                
                logs.push(`Tour ${tour}: ${personnage1.nom} riposte avec ${competence1.nom} et inflige ${resultat1.degats} points de dégâts à ${personnage2.nom}${resultat1.critique ? ' (Critique!)' : ''}`);
                pvParTour.push({ pv1: Math.max(0, pv1), pv2: Math.max(0, pv2) });
                
                if (pv2 <= 0) {
                    logs.push(`${personnage2.nom} est vaincu!`);
                    break;
                }
            }
        }
        
        // Déterminer le vainqueur
        const resultat = {
            vainqueur: pv1 > pv2 ? personnage1 : personnage2,
            perdant: pv1 > pv2 ? personnage2 : personnage1,
            logs: logs,
            pvParTour: pvParTour,
            pvFinal: { pv1: Math.max(0, pv1), pv2: Math.max(0, pv2) }
        };
        
        // Sauvegarder l'historique et faire évoluer le personnage vainqueur
        this.sauvegarderHistorique(resultat);
        await this.evoluerPersonnage(resultat.vainqueur);
        
        return resultat;
    }
    
    static async evoluerPersonnage(personnage) {
        if (!personnage) return;
        
        try {
            // Augmenter les statistiques du personnage
            personnage.niveau += 1;
            personnage.points_de_vie += 5;
            personnage.force += 1;
            
            console.log(`Personnage ${personnage.nom} amélioré! +5 PV, +1 Force, +1 Niveau`);
            
            // Envoyer la mise à jour au serveur
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(personnage)
            };
            
            const response = await fetch(`${ENDPOINT}/personnages/${personnage.id}`, options);
            
            if (!response.ok) {
                throw new Error(`Erreur lors de la mise à jour: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de l'évolution du personnage:", error);
            return personnage;
        }
    }
    
    static getEvolutionPersonnage(personnageId) {
        try {
            const evolutionsJson = localStorage.getItem(this.KEY_EVOLUTIONS);
            const evolutions = evolutionsJson ? JSON.parse(evolutionsJson) : {};
            return evolutions[personnageId] || { bonus_pv: 0, bonus_force: 0, victoires: 0 };
        } catch (error) {
            console.error("Erreur lors de la récupération de l'évolution:", error);
            return { bonus_pv: 0, bonus_force: 0, victoires: 0 };
        }
    }
    
    static async AfterRender(params) {
        try {
            const perso1Id = params.get('perso1');
            const perso2Id = params.get('perso2');
            
            console.log("CombatService handleAfterRender - IDs:", perso1Id, perso2Id);
            
            if (perso1Id && perso2Id) {
                const PersonnageProvider = (await import('./PersonnageProvider.js')).default;
                const perso1 = await PersonnageProvider.getPersonnage(perso1Id);
                const perso2 = await PersonnageProvider.getPersonnage(perso2Id);
                
                if (perso1 && perso2) {
                    const startButton = document.getElementById('start-combat');
                    console.log("Bouton de combat:", startButton);
                    
                    if (startButton) {
                        startButton.addEventListener('click', () => {
                            console.log("Début du combat entre", perso1.nom, "et", perso2.nom);
                            this.startCombatInterface(perso1, perso2);
                        });
                    } else {
                        console.error("Bouton de combat non trouvé");
                    }
                } else {
                    console.error("Personnages non trouvés:", perso1, perso2);
                }
            }
        } catch (error) {
            console.error("Erreur dans handleAfterRender:", error);
        }
    }
    
    static async startCombatInterface(perso1, perso2) {
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
            
            const result = await this.simulerCombat(perso1, perso2);
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