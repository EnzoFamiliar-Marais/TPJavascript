export default class FavorisService {
    static KEY = 'favoris';

    static getFavoris() {
        const favorisJson = localStorage.getItem(this.KEY);
        return favorisJson ? JSON.parse(favorisJson) : [];
    }

    static isFavori(id) {
        const favoris = this.getFavoris();
        return favoris.some(favori => favori.id === id);
    }

    static toggleFavori(personnage) {
        const favoris = this.getFavoris();
        const index = favoris.findIndex(favori => favori.id === personnage.id);
        
        if (index !== -1) {
            favoris.splice(index, 1);
            favoris.push(personnage);
        }
        
        localStorage.setItem(this.KEY, JSON.stringify(favoris));
        return index === -1; 
    }
}
