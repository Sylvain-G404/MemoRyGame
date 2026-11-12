/**
 * ⚙️ CONFIGURATION CENTRALE DU JEU (Architecture AAA - Data-Driven)
 * Ce fichier regroupe toutes les règles, constantes et paramètres du jeu.
 * Modifier une valeur ici met à jour tout le jeu sans toucher au code logique.
 */

// 1. ÉTAT DYNAMIQUE DES OPTIONS (Modifiable en cours de session par le joueur)
export const GameSettings = {
    difficulte: 'normal', // 'normal' (52 cartes) ou 'facile' (26 cartes)
    sonActif: false
};

// 2. DÉFINITION DES MODES DE DIFFICULTÉ
export const DIFFICULTIES = {
    facile: {
        id: 'facile',
        label: 'FACILE (26)',
        labelOptions: 'DIFFICULTÉ : FACILE (26)',
        labelScores: 'MODE : FACILE (26)',
        filtreCouleur: 'Rouge', // Ne garde que Coeur et Carreau (26 cartes)
        nombreCartes: 26
    },
    normal: {
        id: 'normal',
        label: 'NORMAL (52)',
        labelOptions: 'DIFFICULTÉ : NORMAL (52)',
        labelScores: 'MODE : NORMAL (52)',
        filtreCouleur: null, // Garde les 4 familles (52 cartes)
        nombreCartes: 52
    }
};

// 3. RÈGLES DU JEU, SCORING & TIMINGS (Game Feel)
export const GAME_RULES = {
    // Calcul des points
    penaliteErreur: 1,       // +1 point par paire ratée (objectif : score le plus bas)
    seuilCombo: 2,           // Nombre de paires d'affilée pour déclencher le bonus
    bonusCombo: 1,           // -1 point retiré au score dès que le combo est actif

    // Délais et animations (en millisecondes)
    delaiValidationMs: 500,  // Temps avant de valider visuellement une paire trouvée
    delaiErreurMs: 1000,     // Temps de mémorisation avant de retourner une paire ratée
    tickChronoMs: 1000       // Cadence du chronomètre (1 seconde)
};

// 4. SÉCURITÉ & VALIDATION DES PSEUDOS
export const SECURITY_CONFIG = {
    cheminMotsInterdits: './Data/mots_interdits.json',
    pseudoMinLength: 3,
    pseudoMaxLength: 16,
    pseudoParDefaut: 'Anonyme',
    motsStricts: ["con", "pd", "mod", "gm", "sex", "fag"]
};

// 5. RÉSEAU & CLASSEMENT EN LIGNE (Supabase)
export const NETWORK_CONFIG = {
    supabaseUrl: "https://yztszszdkozflkxprbjh.supabase.co",
    supabaseKey: "sb_publishable_sar6i7TUqaim__NVMze7bA_CRxfVyg4",
    tableScores: "highscores",
    limiteTopScores: 10
};

// 6. AUDIO & EFFETS SONORES (Prêt pour les futurs sons personnalisés)
export const AUDIO_CONFIG = {
    dossierBase: '../../Assets/Sounds/',
    volumeDefaut: 0.5,       // Volume entre 0.0 et 1.0
    antiSpamMs: 150,         // Délai minimum entre deux sons identiques
    sons: {
        flip: 'flipcard.mp3' // , <- oublie pas ;)
        // Décommente ou ajoute les fichiers dès que ton collègue te les envoie :
        // match: 'match.mp3',
        // error: 'error.mp3',
        // victory: 'victory.mp3',
        // click: 'click.mp3'
    }
};

// 7. AFFICHAGE & PLEIN ÉCRAN
export const DISPLAY_CONFIG = {
    labelPleinEcranOn: 'PLEIN ÉCRAN : ACTIVÉ',
    labelPleinEcranOff: 'PLEIN ÉCRAN : DÉSACTIVÉ'
};
