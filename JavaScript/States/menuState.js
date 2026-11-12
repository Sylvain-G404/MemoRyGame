import { GameStateManager } from './stateManager.js';

class MenuStateClass {
    constructor() {
        this.menuContainer = null;
    }

    // Cette méthode est appelée automatiquement par le StateManager quand on arrive sur le menu
    enter() {
        
        // 1. On récupère ou on crée un conteneur HTML pour notre menu
        this.menuContainer = document.getElementById('menu-container');
        if (this.menuContainer) {
            this.menuContainer.style.display = 'flex'; // On affiche le menu
            this.setupEventListeners();
        }
    }

    // Écoute les clics sur les boutons du menu
    setupEventListeners() {
        // Bouton Jouer
        document.getElementById('btn-play')?.addEventListener('click', () => {
            GameStateManager.changeState('game');
        });

        // Bouton Options
        document.getElementById('btn-options')?.addEventListener('click', () => {
            GameStateManager.changeState('options');
        });

        // Bouton Classement / Scores
        document.getElementById('btn-scores')?.addEventListener('click', () => {
            GameStateManager.changeState('scores');
        });

        // Bouton Crédits
        document.getElementById('btn-credits')?.addEventListener('click', () => {
            GameStateManager.changeState('credits');
        });

        // Bouton Portfolio (Ouverture dans un nouvel onglet)
        document.getElementById('btn-portfolio')?.addEventListener('click', () => {
            window.open(
                "https://sylvain-g404.github.io/Mon-Portfolio-Temps/", 
                "_blank", 
                "noopener,noreferrer"
            );
        });
    }

    // Cette méthode est appelée automatiquement par le StateManager juste avant de changer d'écran
    exit() {
        
        // On cache proprement le conteneur du menu pour laisser la place au suivant
        if (this.menuContainer) {
            this.menuContainer.style.display = 'none';
        }
    }
}

// On exporte l'instance de notre état Menu
export const MenuState = new MenuStateClass();
