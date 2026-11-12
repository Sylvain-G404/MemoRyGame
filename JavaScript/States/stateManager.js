class StateManager {
    constructor() {
        this.currentState = null;
        this.states = new Map(); // Stocke toutes les instances de nos écrans
    }

    // Enregistre un nouvel écran dans le gestionnaire
    registerState(name, stateInstance) {
        this.states.set(name, stateInstance);
    }

    // Alerte le gestionnaire pour changer d'écran
    changeState(stateName, data = null) {
        // 1. Si un écran est déjà actif, on appelle sa méthode de nettoyage (Clean Up)
        if (this.currentState && this.currentState.exit) {
            this.currentState.exit();
        }

        // 2. On récupère le nouvel écran demandé
        const nextState = this.states.get(stateName);

        if (!nextState) {
            console.error(`L'état "${stateName}" n'existe pas !`);
            return;
        }

        // 3. On bascule sur le nouvel écran
        this.currentState = nextState;

        // 4. On l'initialise (en lui passant d'éventuelles données comme le score final)
        if (this.currentState.enter) {
            this.currentState.enter(data);
        }
    }
}

// On exporte une instance unique pour tout le projet
export const GameStateManager = new StateManager();
