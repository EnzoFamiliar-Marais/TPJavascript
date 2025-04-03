import PersonnageProvider from '../../PersonnageProvider.js';
import FormulaireAdd from '../../FormulaireAdd.js';

export default class AddPersonnage {
    async render() {
        // Récupérer la liste des équipements disponibles
        const equipements = await PersonnageProvider.getEquipements();
        
        return `
            <div class="add-personnage-container">
                <h2>Ajouter un nouveau personnage</h2>
                
                <form id="add-personnage-form">
                    <div class="form-group">
                        <label for="nom">Nom:</label>
                        <input type="text" id="nom" name="nom" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="classe">Classe:</label>
                        <select id="classe" name="classe" required>
                            <option value="Guerrier">Guerrier</option>
                            <option value="Mage">Mage</option>
                            <option value="Archer">Archer</option>
                            <option value="Voleur">Voleur</option>
                            <option value="Nécromancien">Nécromancien</option>
                            <option value="Cyborg">Cyborg</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="niveau">Niveau:</label>
                        <input type="number" id="niveau" name="niveau" min="1" value="1" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="points_de_vie">Points de vie:</label>
                        <input type="number" id="points_de_vie" name="points_de_vie" min="50" value="100" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="force">Force:</label>
                        <input type="number" id="force" name="force" min="1" value="10" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="agilite">Agilité:</label>
                        <input type="number" id="agilite" name="agilite" min="1" value="10" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="intelligence">Intelligence:</label>
                        <input type="number" id="intelligence" name="intelligence" min="1" value="10" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Équipements:</label>
                        <div class="equipements-list">
                            ${equipements.map(equip => `
                                <div class="equipement-item">
                                    <input type="checkbox" id="equip-${equip.id}" name="equipement_ids" value="${equip.id}">
                                    <label for="equip-${equip.id}">${equip.nom} (${equip.type})</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="form-group competences-container">
                        <h3>Compétences</h3>
                        <div id="competences-list">
                            <div class="competence-item">
                                <input type="text" name="competence_nom[]" placeholder="Nom de la compétence" required>
                                <input type="text" name="competence_description[]" placeholder="Description" required>
                                <select name="competence_type[]">
                                    <option value="degats">Dégâts</option>
                                    <option value="effet">Effet</option>
                                </select>
                                <input type="number" name="competence_valeur[]" placeholder="Valeur" min="1" required>
                            </div>
                        </div>
                        <button type="button" id="add-competence">Ajouter une compétence</button>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn-submit">Ajouter le personnage</button>
                        <a href="#/personnages" class="btn-cancel">Annuler</a>
                    </div>
                </form>
            </div>
        `;
    }
    
    async after_render() {
        await FormulaireAdd.AjouterPerso();
    }
}
