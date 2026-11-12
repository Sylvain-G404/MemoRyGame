import { GameStateManager } from './stateManager.js';
import { NetworkEngine } from '../Engine/network.js';
import { SecurityEngine } from '../Engine/security.js';

class VictoryStateClass {
    constructor() {
        this.container = null;
        this.statsPartie = null;
    }

    // Reçoit automatiquement les données de la partie gagnée depuis GameState
    enter(data) {
        this.container = document.getElementById('victory-container');
        this.statsPartie = data; // { score, comboMax, temps, difficulte }

        if (this.container && this.statsPartie) {
            this.container.style.display = 'flex';
            this.remplirTableau();
            this.setupEvents();
        }
    }

    remplirTableau() {
        document.getElementById('vic-diff').textContent = this.statsPartie.difficulte.toUpperCase();
        document.getElementById('vic-score').textContent = this.statsPartie.score;
        document.getElementById('vic-combo').textContent = this.statsPartie.comboMax;
        document.getElementById('vic-temps').textContent = this.statsPartie.temps;
        
        // On vide le champ pseudo au cas où le joueur rejoue
        const inputPseudo = document.getElementById('input-pseudo');
        if (inputPseudo) inputPseudo.value = "";
    }

    setupEvents() {
        const btnSubmit = document.getElementById('btn-submit-score');
        const btnMenu = document.getElementById('btn-victory-menu');
        const inputPseudo = document.getElementById('input-pseudo');

        if (btnSubmit) {
            btnSubmit.onclick = async () => {
                const verification = SecurityEngine.validerPseudo(inputPseudo.value);
                if (!verification.valide) {
                    alert(verification.message);
                    return;
                }

                btnSubmit.textContent = "ENVOI EN COURS...";
                btnSubmit.disabled = true;

                // Envoi vers Supabase
                const resultat = await NetworkEngine.submitScore(
                    verification.pseudoPropre, 
                    this.statsPartie.score,
                    this.statsPartie.comboMax,
                    this.statsPartie.temps,
                    this.statsPartie.difficulte
                );

                btnSubmit.textContent = "VALIDER";
                btnSubmit.disabled = false;

                if (resultat.success) {
                    // Une fois enregistré, on bascule directement sur le Classement mondial !
                    GameStateManager.changeState('scores');
                } else {
                    alert("Erreur lors de l'envoi du score. Vérifie ta connexion.");
                }
            };
        }

        if (btnMenu) {
            btnMenu.onclick = () => {
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

export const VictoryState = new VictoryStateClass();
