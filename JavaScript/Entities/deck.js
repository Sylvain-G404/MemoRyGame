import { Carte } from './carte.js';
import { DIFFICULTIES } from '../Engine/config.js';

export class Deck {
    constructor() {
        this.cartes = [];
        this.valeurs = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'D', 'R', 'As'];
    }

    // Génère les cartes en fonction du mode (Facile ou Normal)
    genererPaquet(modeDifficulte) {
        this.cartes = [];

        // Familles de cartes
        const familles = [
            { nom: 'Coeur', couleur: 'Rouge' },
            { nom: 'Carreau', couleur: 'Rouge' },
            { nom: 'Pique', couleur: 'Noir' },
            { nom: 'Trefle', couleur: 'Noir' }
        ];

        // 1. On fabrique le jeu complet de 52 cartes
        familles.forEach(famille => {
            this.valeurs.forEach(valeur => {
                this.cartes.push(new Carte(valeur, famille.couleur, famille.nom));
            });
        });

        const configMode = DIFFICULTIES[modeDifficulte] || DIFFICULTIES.normal;

        if (configMode.filtreCouleur) {
            this.cartes = this.cartes.filter(carte => carte.couleur === configMode.filtreCouleur);
        }

        // 3. On mélange le tout
        this.melanger();
        
        return this.cartes;
    }

    // Algorithme de mélange pro (Fisher-Yates)
    melanger() {
        for (let i = this.cartes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cartes[i], this.cartes[j]] = [this.cartes[j], this.cartes[i]];
        }
    }
}
