import { GameStateManager } from './stateManager.js';
import { Deck } from '../Entities/deck.js';
import { Sound } from '../Engine/sounds.js';
import { genererLogoStatique  } from '../Logo/logoEngine.js';
import { GameSettings, GAME_RULES } from '../Engine/config.js';

class GameStateClass {
    constructor() {
        this.gameContainer = null;
        this.grilleTable = null;
        this.deckManager = new Deck();
        this.listeCartes = [];
        
        // Stats de la partie
        this.score = 0;
        this.combo = 0;
        this.comboMax = 0;
        this.pairesTrouvees = 0;
        this.estBloque = false;
        
        this.premiereCarte = null;
        this.deuxiemeCarte = null;

        this.secondesEcoulees = 0;
        this.timerInterval = null;
    }

    enter() {
        
        this.gameContainer = document.getElementById('game-container');
        this.grilleTable = document.getElementById('table');
        
        if (this.gameContainer) {
            this.gameContainer.style.display = 'flex';
        }

        genererLogoStatique();
        this.initGame();
    }

    initGame() {
        this.score = 0;
        this.combo = 0;
        this.comboMax = 0;
        this.pairesTrouvees = 0;
        this.estBloque = false;
        this.premiereCarte = null;
        this.deuxiemeCarte = null;

        this.updateHUD();
        this.setupEventListeners();
        this.demarrerTimer();

        if (this.grilleTable) {
            this.grilleTable.innerHTML = "";
            this.listeCartes = this.deckManager.genererPaquet(GameSettings.difficulte);

            this.listeCartes.forEach((carte, index) => {
                const elementHTML = carte.render(index);
                
                // ÉCOUTEUR DE CLIC SUR LA CARTE
                elementHTML.addEventListener('click', () => this.gererClicCarte(carte));
                
                this.grilleTable.appendChild(elementHTML);
            });
        }
    }

    // CŒUR DU GAMEPLAY : Gestion d'un retournement
    gererClicCarte(carte) {
        // 1. Sécurités (si animation en cours, carte déjà retournée ou trouvée)
        if (this.estBloque) return;
        if (carte.estRetournee || carte.estTrouvee) return;

        // 2. On retourne la carte et on joue le son
        carte.retourner();
        Sound.playFlip();

        // 3. Premier clic du tour
        if (!this.premiereCarte) {
            this.premiereCarte = carte;
            return;
        }

        // 4. Deuxième clic du tour : on verrouille le plateau et on compare !
        this.deuxiemeCarte = carte;
        this.estBloque = true;
        this.verifierPaire();
    }

    verifierPaire() {
        // RÈGLE DU JEU : Même valeur ET même couleur (ex: Roi Coeur + Roi Carreau)
        const estMatch = (
            this.premiereCarte.valeur === this.deuxiemeCarte.valeur &&
            this.premiereCarte.couleur === this.deuxiemeCarte.couleur
        );

        if (estMatch) {
            // C'est gagné pour cette paire !
            setTimeout(() => {
                this.premiereCarte.valider();
                this.deuxiemeCarte.valider();
                this.pairesTrouvees++;
                
                this.enregistrerTentative(true);
                this.resetTour();
                this.verifierVictoire();
            }, GAME_RULES.delaiValidationMs);
        } else {
            // Raté : on laisse le joueur mémoriser 1 seconde avant de retourner
            setTimeout(() => {
                this.premiereCarte.masquer();
                this.deuxiemeCarte.masquer();
                
                this.enregistrerTentative(false);
                this.resetTour();
            }, GAME_RULES.delaiErreurMs);
        }

    }

    enregistrerTentative(estMatch) {
        if (!estMatch) {
            this.combo = 0;
            this.score += GAME_RULES.penaliteErreur; // Pénalité +1
        } else {
            this.combo++;
            if (this.combo > this.comboMax) {
                this.comboMax = this.combo;
            }
            if (this.combo >= GAME_RULES.seuilCombo) {
                this.score -= GAME_RULES.bonusCombo; // Bonus lu depuis config.js
            }
        }
        this.updateHUD();
    }

    resetTour() {
        this.premiereCarte = null;
        this.deuxiemeCarte = null;
        this.estBloque = false;
    }

    verifierVictoire() {
        const totalPaires = this.listeCartes.length / 2;
        if (this.pairesTrouvees === totalPaires) {
            this.arreterTimer();

            // On envoie le joueur vers l'écran de Victoire avec son bilan !
            GameStateManager.changeState('victory', {
                score: this.score,
                comboMax: this.comboMax,
                temps: this.getTempsFormate(),
                difficulte: GameSettings.difficulte
            });
        }
    }

    setupEventListeners() {
        // 1. Bouton Retour (si présent)
        const btnRetour = this.gameContainer?.querySelector('.retour-portfolio');
        btnRetour?.addEventListener('click', (e) => {
            e.preventDefault();
            GameStateManager.changeState('menu');
        });

        // 2. Bouton Son In-Game
        const soundBtn = document.getElementById('soundToggle');
        if (soundBtn) {
            // On utilise .onclick pour éviter de doubler l'écouteur si on relance une partie
            soundBtn.onclick = () => {
                const estActif = Sound.toggle();
                soundBtn.textContent = estActif ? '🔊' : '🔇';
                soundBtn.classList.toggle('off', !estActif);
                
                // Petit feedback audio immédiat si le joueur réactive le son !
                if (estActif) Sound.playFlip();
            };
        }
    }

    updateHUD() {
        const scoreVal = document.getElementById('score-val');
        const comboVal = document.getElementById('combo-val');
        if (scoreVal) scoreVal.textContent = this.score;
        if (comboVal) comboVal.textContent = this.combo;
    }

    exit() {

        this.arreterTimer();

        if (this.gameContainer) {
            this.gameContainer.style.display = 'none';
        }
        if (this.grilleTable) {
            this.grilleTable.innerHTML = "";
        }
    }

    // Démarre le chronomètre
    demarrerTimer() {
        this.arreterTimer(); // Sécurité : évite d'avoir deux chronos qui tournent en même temps
        this.secondesEcoulees = 0;
        this.updateTimerHUD();

        this.timerInterval = setInterval(() => {
            this.secondesEcoulees++;
            this.updateTimerHUD();
        }, GAME_RULES.tickChronoMs);
    }

    // Arrête le chronomètre proprement
    arreterTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    // Formate les secondes en "MM:SS" et met à jour le HTML
    getTempsFormate() {
        const minutes = Math.floor(this.secondesEcoulees / 60).toString().padStart(2, '0');
        const secondes = (this.secondesEcoulees % 60).toString().padStart(2, '0');
        return `${minutes}:${secondes}`;
    }

    updateTimerHUD() {
        const timerVal = document.getElementById('timer-val');
        if (timerVal) timerVal.textContent = this.getTempsFormate();
    }

}

export const GameState = new GameStateClass();
