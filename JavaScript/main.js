import { GameStateManager } from './States/stateManager.js';
import { MenuState } from './States/menuState.js';
import { GameState } from './States/gameState.js';
import { OptionsState } from './States/optionsState.js';
import { ScoresState } from './States/scoresState.js';
import { CreditsState } from './States/creditsState.js';
import { VictoryState } from './States/victoryState.js';
import { SecurityEngine } from './Engine/security.js';

class MainApp {
    constructor() {
        window.addEventListener('DOMContentLoaded', () => this.init());
    }

    async init() {
        await SecurityEngine.chargerFiltre();

        try {
            // Enregistrement de tous nos écrans de base
            GameStateManager.registerState('menu', MenuState);
            GameStateManager.registerState('game', GameState);
            GameStateManager.registerState('options', OptionsState);
            GameStateManager.registerState('scores', ScoresState);
            GameStateManager.registerState('credits', CreditsState);
            GameStateManager.registerState('victory', VictoryState);

            // Lancement sur le menu d'accueil
            GameStateManager.changeState('menu');

        } catch (error) {
            console.error("🔴 Échec du lancement de l'application :", error);
        }
    }
}

new MainApp();