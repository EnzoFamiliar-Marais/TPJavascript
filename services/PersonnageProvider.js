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

            const equipementsResponse = await fetch(`${ENDPOINT}/equipements`, options);
            const equipements = await equipementsResponse.json();
            console.log("les equipements sont :", equipements);

            personnage.equipements = personnage.equipements.map(id => {
                let equipement;
                equipements.forEach(e => {
                    if (Number(e.id) === Number(id)) {
                        equipement = e;
                    }
                });
                if (!equipement) {
                console.error(`Équipement avec l'ID ${id} non trouvé pour le personnage ${personnage.nom}`);
                }
                return equipement || { nom: "Inconnu", type: "Inconnu" }; 
            });

            return personnage;
        }
        catch (error) {
            console.error(error);
        }
    }

}

