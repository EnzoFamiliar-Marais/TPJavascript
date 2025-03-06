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
            const response = await fetch(`${ENDPOINT}/personnages?limit=${limit}`, options);
            const json = await response.json();
            return json;
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
            const json = await response.json();
            return json;
        }
        catch (error) {
            console.error(error);
        }
    }

}

