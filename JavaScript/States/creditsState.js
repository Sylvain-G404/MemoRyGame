import { GameStateManager } from './stateManager.js';

class CreditsStateClass {
    constructor() {
        this.container = null;
    }

    enter() {
        this.container = document.getElementById('credits-container');
        if (this.container) {
            this.container.style.display = 'flex';
            this.setupEvents();
        }
    }

    setupEvents() {
        const btnBack = document.getElementById('btn-credits-back');
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

export const CreditsState = new CreditsStateClass();
