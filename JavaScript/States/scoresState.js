import { GameStateManager } from './stateManager.js';
import { NetworkEngine } from '../Engine/network.js';
import { DIFFICULTIES } from '../Engine/config.js';

class ScoresStateClass {
    constructor() {
        this.container = null;
        this.modeActuel = DIFFICULTIES.normal.id;
    }

    async enter() {
        this.container = document.getElementById('scores-container');
        if (this.container) {
            this.container.style.display = 'flex';
            this.setupEvents();
            await this.chargerScores();
        }
    }

    setupEvents() {
        // Bascule entre le classement Normal et Facile
        const btnDiff = document.getElementById('btn-scores-diff');
        btnDiff.onclick = async () => {
            this.modeActuel = (this.modeActuel === DIFFICULTIES.normal.id) 
                ? DIFFICULTIES.facile.id 
                : DIFFICULTIES.normal.id;
            btnDiff.textContent = DIFFICULTIES[this.modeActuel].labelScores;
            await this.chargerScores();
        };

        // Retour au menu principal
        const btnBack = document.getElementById('btn-scores-back');
        if (btnBack) {
            btnBack.onclick = () => {
                GameStateManager.changeState('menu');
            };
        }
    }

    async chargerScores() {
        const tbody = document.getElementById('scores-tbody');
        if (!tbody) return;

        tbody.innerHTML = `<tr><td colspan="5">Chargement depuis le Cloud...</td></tr>`;

        // Récupération du Top 10 depuis Supabase
        const listeScores = await NetworkEngine.fetchTopScores(this.modeActuel);

        if (listeScores.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5">Aucun score enregistré dans ce mode.</td></tr>`;
            return;
        }

        // Génération des lignes du tableau
        tbody.innerHTML = listeScores.map((ligne, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${ligne.pseudo}</td>
                <td>${ligne.score}</td>
                <td>x${ligne.combo_max}</td>
                <td>${ligne.temps}</td>
            </tr>
        `).join('');
    }

    exit() {
        if (this.container) {
            this.container.style.display = 'none';
        }
    }
}

export const ScoresState = new ScoresStateClass();
