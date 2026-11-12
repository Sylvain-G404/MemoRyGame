import { GameSettings, AUDIO_CONFIG } from './config.js';

class SoundEngine {
    constructor() {
        this.banqueSons = {};
        this.lastPlay = {};
        this.enabled = GameSettings.sonActif;

        this.chargerSons();
    }

    // Charge automatiquement tous les sons listés dans config.js
    chargerSons() {
        for (const [cle, fichier] of Object.entries(AUDIO_CONFIG.sons)) {
            const urlSecurisee = new URL(`${AUDIO_CONFIG.dossierBase}${fichier}`, import.meta.url).href;
            const audio = new Audio(urlSecurisee);
            audio.volume = AUDIO_CONFIG.volumeDefaut;
            
            this.banqueSons[cle] = audio;
            this.lastPlay[cle] = 0;
        }
    }

    init() {
        this.setupAudioUnlock();
    }

    // Débloque proprement l'audio au premier clic sur l'application
    setupAudioUnlock() {
        document.body.addEventListener("click", () => {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            if (context.state === 'suspended') {
                context.resume();
            }
        }, { once: true });
    }

    toggle() {
        this.enabled = !this.enabled;
        GameSettings.sonActif = this.enabled;
        return this.enabled;
    }

    setSoundEnabled(status) {
        this.enabled = status;
        GameSettings.sonActif = status;
    }

    // Méthode générique AAA pour jouer n'importe quel son déclaré dans config.js
    play(nomSon) {
        if (!this.enabled) return;

        const audio = this.banqueSons[nomSon];
        if (!audio) return; // Sécurité silencieuse si le son n'existe pas encore

        const now = Date.now();
        if (now - (this.lastPlay[nomSon] || 0) < AUDIO_CONFIG.antiSpamMs) return;

        audio.pause();
        audio.currentTime = 0;
        audio.play().catch(() => {}); // Évite les erreurs console si le navigateur bloque l'autoplay

        this.lastPlay[nomSon] = now;
    }

    // Raccourci rétro-compatible avec ton code existant
    playFlip() {
        this.play('flip');
    }
}

// On exporte une instance unique (Singleton) pour tout le jeu
export const Sound = new SoundEngine();