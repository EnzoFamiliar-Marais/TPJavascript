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
        // Base de dégâts: dégâts de compétence + modificateur de force
        let degatsBase = competence.degats || 0;
        degatsBase += Math.floor(attaquant.force * 0.5);
        
        // Calcul de la défense
        let defense = 0;
        if (defenseur.equipements) {
            defense = defenseur.equipements
                .filter(eq => eq.type === 'armure')
                .reduce((total, eq) => total + eq.defense, 0);
        }
        
        // Réduction des dégâts par la défense (minimum 1)
        const degatsFinaux = Math.max(1, degatsBase - defense);
        
        // Chance de coup critique basée sur l'agilité
        const chanceCritique = Math.min(0.05 + (attaquant.agilité / 100), 0.25); // max 25%
        const estCritique = Math.random() < chanceCritique;
        
        return {
            degats: estCritique ? Math.floor(degatsFinaux * 1.5) : degatsFinaux,
            critique: estCritique
        };
    }
    
    static choisirCompetenceAleatoire(personnage) {
        // Préférer les compétences offensives
        const competencesOffensives = personnage.competences.filter(c => c.degats && c.degats > 0);
        
        if (competencesOffensives.length === 0) {
            // Attaque par défaut si pas de compétence offensive
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
        
        // Simuler le combat jusqu'à ce qu'un des personnages n'ait plus de PV
        while (pv1 > 0 && pv2 > 0 && tour < 20) { // Maximum 20 tours
            tour++;
            
            // Choix aléatoire de qui attaque en premier basé sur l'agilité
            const agilite1 = personnage1.agilité || 0;
            const agilite2 = personnage2.agilité || 0;
            const perso1AttaqueEnPremier = Math.random() < (agilite1 / (agilite1 + agilite2));
            
            if (perso1AttaqueEnPremier) {
                // Personnage 1 attaque
                const competence1 = this.choisirCompetenceAleatoire(personnage1);
                const resultat1 = this.calculerDegats(personnage1, personnage2, competence1);
                pv2 -= resultat1.degats;
                
                logs.push(`Tour ${tour}: ${personnage1.nom} utilise ${competence1.nom} et inflige ${resultat1.degats} points de dégâts à ${personnage2.nom}${resultat1.critique ? ' (Critique!)' : ''}`);
                pvParTour.push({ pv1, pv2: Math.max(0, pv2) });
                
                if (pv2 <= 0) {
                    logs.push(`${personnage2.nom} est vaincu!`);
                    break;
                }
                
                // Personnage 2 riposte
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
        
        // Sauvegarder l'historique
        this.sauvegarderHistorique(resultat);
        
        return resultat;
    }
}