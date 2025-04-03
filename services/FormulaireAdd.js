import PersonnageProvider from './PersonnageProvider.js';

export default class FormulaireAdd {
    static async AjouterPerso() {
        // Gérer l'ajout de compétences
        document.getElementById('add-competence').addEventListener('click', () => {
            const competencesList = document.getElementById('competences-list');
            const newCompetence = document.createElement('div');
            newCompetence.className = 'competence-item';
            newCompetence.innerHTML = `
                <input type="text" name="competence_nom[]" placeholder="Nom de la compétence" required>
                <input type="text" name="competence_description[]" placeholder="Description" required>
                <select name="competence_type[]">
                    <option value="degats">Dégâts</option>
                    <option value="effet">Effet</option>
                </select>
                <input type="number" name="competence_valeur[]" placeholder="Valeur" min="1" required>
                <button type="button" class="remove-competence">Supprimer</button>
            `;
            competencesList.appendChild(newCompetence);
            
            newCompetence.querySelector('.remove-competence').addEventListener('click', () => {
                competencesList.removeChild(newCompetence);
            });
        });
        
        // Gérer le formulaire d'ajout
        document.getElementById('add-personnage-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            
            const equipementIds = Array.from(formData.getAll('equipement_ids')).map(id => parseInt(id));
            
            const competenceNoms = formData.getAll('competence_nom[]');
            const competenceDescriptions = formData.getAll('competence_description[]');
            const competenceTypes = formData.getAll('competence_type[]');
            const competenceValeurs = formData.getAll('competence_valeur[]');
            
            const competences = competenceNoms.map((nom, index) => {
                const competence = {
                    nom: nom,
                    description: competenceDescriptions[index]
                };
                
                if (competenceTypes[index] === 'degats') {
                    competence.degats = parseInt(competenceValeurs[index]);
                } else {
                    competence.effet = competenceValeurs[index];
                }
                
                return competence;
            });
            
            const newPersonnage = {
                nom: formData.get('nom'),
                classe: formData.get('classe'),
                niveau: parseInt(formData.get('niveau')),
                points_de_vie: parseInt(formData.get('points_de_vie')),
                force: parseInt(formData.get('force')),
                agilité: parseInt(formData.get('agilite')),
                intelligence: parseInt(formData.get('intelligence')),
                equipement_ids: equipementIds,
                competences: competences
            };
            
            try {
                const result = await PersonnageProvider.addPersonnage(newPersonnage);
                if (result) {
                    alert('Personnage ajouté avec succès!');
                    window.location.hash = '#/personnages';
                } else {
                    alert('Erreur lors de l\'ajout du personnage');
                }
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue');
            }
        });
    }
    
    static async recherche(personnages) {
        if (!personnages) {
            personnages = await PersonnageProvider.getPersonnages(20);
        }
        
        document.getElementById('searchButton').addEventListener('click', async () => {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const filteredPersonnages = personnages.filter(p => 
                p.nom.toLowerCase().includes(searchTerm)
            );
            
            const list = document.querySelector('.personnages-list');
            const FavorisService = (await import('./FavorisService.js')).default;
            
            list.innerHTML = filteredPersonnages.map(personnage => {
                const isFavori = FavorisService.isFavori(personnage.id);
                return `
                <li class="personnage-item">
                    <span class="personnage-nom">${personnage.nom}</span>
                    <span class="personnage-classe">${personnage.classe}</span>
                    <span class="personnage-niveau">Niveau ${personnage.niveau}</span>
                    ${isFavori ? '⭐' : ''} 
                    <a href="#/personnages/${personnage.id}" class="btn-view">Voir</a>
                </li>
                `;
            }).join('\n');
        });
    }
}
