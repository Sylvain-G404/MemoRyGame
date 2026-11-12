import { GameStateManager } from './stateManager.js';
import { GameSettings, DIFFICULTIES } from '../Engine/config.js';

class OptionsStateClass {
    constructor() {
        this.container = null;
    }

    enter() {
        this.container = document.getElementById('options-container');
        if (this.container) {
            this.container.style.display = 'flex';
            this.updateAffichage();
            this.setupEvents();
        }
    }

    updateAffichage() {
        const btnDiff = document.getElementById('btn-toggle-diff');
        if (btnDiff) {
            const configActuelle = DIFFICULTIES[GameSettings.difficulte];
            btnDiff.textContent = configActuelle.labelOptions;
        }
    }

    setupEvents() {
        // Bascule entre Facile et Normal au clic
        const btnDiff = document.getElementById('btn-toggle-diff');
        if (btnDiff) {
            btnDiff.onclick = () => {
                GameSettings.difficulte = (GameSettings.difficulte === DIFFICULTIES.normal.id) 
                    ? DIFFICULTIES.facile.id 
                    : DIFFICULTIES.normal.id;
                this.updateAffichage();
            };
        }

        // Retour au menu principal
        const btnBack = document.getElementById('btn-options-back');
        if (btnBack) {
            btnBack.onclick = () => {
                GameStateManager.changeState('menu');
            };
        }
    }

    exit() {
        if (this.container) {
            this.container.style.display = 'none';
        }
    }
}

export const OptionsState = new OptionsStateClass();
