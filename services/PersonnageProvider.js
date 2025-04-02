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
            const response = await fetch(url, options);
            const personnages = await response.json();
            console.log(personnages);
            return personnages;
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
            
            // récupérer les équipements et associer aux IDs
            const equipementsResponse = await fetch(`${ENDPOINT}/equipements`, options);
            const equipements = await equipementsResponse.json();
            console.log("les equipements sont :", equipements);
            
            // Vérifier que personnage.equipement_ids existe avant de l'utiliser
            if (personnage.equipement_ids && Array.isArray(personnage.equipement_ids)) {
                personnage.equipements = personnage.equipement_ids.map(id => {
                    const equipement = equipements.find(e => Number(e.id) === Number(id));
                    if (!equipement) {
                        console.error(`Équipement avec l'ID ${id} non trouvé pour le personnage ${personnage.nom}`);
                    }
                    return equipement || { nom: "Inconnu", type: "Inconnu" };
                });
            } else {
                // Si aucun equipement_ids n'est trouvé, initialiser avec un tableau vide
                personnage.equipements = [];
            }

            return personnage;
        }
        catch (error) {
            console.error(error);
            return null;
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

