import PersonnageProvider from "../../PersonnageProvider.js";

export default class PersonnageAdd {
    async render() {
        return `
            <h2>Ajouter un Personnage</h2>
            <form id="add-personnage-form">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" name="nom" required>
                
                <label for="classe">Classe :</label>
                <input type="text" id="classe" name="classe" required>
                
                <label for="niveau">Niveau :</label>
                <input type="number" id="niveau" name="niveau" required>
                
                <label for="points_de_vie">Points de Vie :</label>
                <input type="number" id="points_de_vie" name="points_de_vie" required>
                
                <label for="force">Force :</label>
                <input type="number" id="force" name="force" required>
                
                <label for="agilité">Agilité :</label>
                <input type="number" id="agilité" name="agilité" required>
                
                <label for="intelligence">Intelligence :</label>
                <input type="number" id="intelligence" name="intelligence" required>
                
                <label for="equipements">Équipements (IDs séparés par des virgules) :</label>
                <input type="text" id="equipements" name="equipements" required>
                
                <button type="submit">Ajouter</button>
            </form>
            <h4><a href="#/">Retour</a></h4>
        `;
    }

    async afterRender() {
        document.getElementById('add-personnage-form').addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const personnage = {
                nom: formData.get('nom'),
                classe: formData.get('classe'),
                niveau: Number(formData.get('niveau')),
                points_de_vie: Number(formData.get('points_de_vie')),
                force: Number(formData.get('force')),
                agilité: Number(formData.get('agilité')),
                intelligence: Number(formData.get('intelligence')),
                equipements: formData.get('equipements').split(',').map(id => Number(id)),
                competences: [], // Par défaut, aucune compétence
                evolution: {
                    niveau_suivant: Number(formData.get('niveau')) + 1,
                    bonus: {}
                }
            };

            const newPersonnage = await PersonnageProvider.addPersonnage(personnage);
            if (newPersonnage) {
                alert("Personnage ajouté avec succès !");
                window.location.hash = "#/";
            } else {
                alert("Erreur lors de l'ajout du personnage.");
            }
        });
    }
}
