class FullscreenEngineClass {
    constructor() {
        this.callbacks = [];
        // Écoute les changements externes (ex: touche Échap ou geste mobile)
        document.addEventListener('fullscreenchange', () => this.notifierChangement());
        document.addEventListener('webkitfullscreenchange', () => this.notifierChangement());
    }

    // Vérifie si le jeu est actuellement en plein écran
    estActif() {
        return Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    }

    // Vérifie si le navigateur autorise le plein écran (utile pour masquer le bouton sur iPhone Safari)
    estSupporte() {
        const docEl = document.documentElement;
        return Boolean(docEl.requestFullscreen || docEl.webkitRequestFullscreen);
    }

    // Bascule entre plein écran et fenêtré
    async toggle() {
        if (!this.estSupporte()) return;

        try {
            if (!this.estActif()) {
                const docEl = document.documentElement;
                if (docEl.requestFullscreen) {
                    await docEl.requestFullscreen();
                } else if (docEl.webkitRequestFullscreen) {
                    await docEl.webkitRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    await document.webkitExitFullscreen();
                }
            }
        } catch (err) {
            console.warn("Impossible de basculer le plein écran :", err);
        }
    }

    // Permet à l'interface (OptionsState) d'être prévenue si l'état change
    onChange(callback) {
        this.callbacks.push(callback);
    }

    notifierChangement() {
        const actif = this.estActif();
        this.callbacks.forEach(cb => cb(actif));
    }
}

export const FullscreenEngine = new FullscreenEngineClass();
