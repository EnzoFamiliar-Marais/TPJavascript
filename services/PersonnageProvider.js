import { ENDPOINT } from "../config.js";

export default class PersonnageProvider {

    static getPersonnages = async (limit = 10) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const url = `${ENDPOINT}/personnages?limit=${limit}`;
            console.log(url);
            const response = await fetch(`${ENDPOINT}/personnages?limit=${limit}`, options);
            const personnages = await response.json();
            
            const equipements = await this.getEquipements();
            console.log(equipements);
            
            return personnages.map(personnage => {
                const equipementsPersonnage = equipements.filter(equip => 
                    personnage.equipement_ids && personnage.equipement_ids.includes(equip.id)
                );
                
                return {
                    ...personnage,
                    equipements: equipementsPersonnage || []
                };
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    static getPersonnage = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/personnages/${id}`, options);
            const personnage = await response.json();
            
            const equipements = await this.getEquipements();
            const equipementsPersonnage = equipements.filter(equip => 
                personnage.equipement_ids && personnage.equipement_ids.includes(equip.id)
            );
            
            return {
                ...personnage,
                equipements: equipementsPersonnage || []
            };
        }
        catch (error) {
            console.error(error);
        }
    }
    
    static getEquipements = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/equipements`, options);
            return await response.json();
        }
        catch (error) {
            console.error("Erreur lors de la récupération des équipements:", error);
            return [];
        }
    }
    
    static getEquipementsParPersonnage = async (personnageId) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/equipements?personnage_id=${personnageId}`, options);
            return await response.json();
        }
        catch (error) {
            console.error("Erreur lors de la récupération des équipements du personnage:", error);
            return [];
        }
    }
}

