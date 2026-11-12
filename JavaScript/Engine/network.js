import { NETWORK_CONFIG, SECURITY_CONFIG, DIFFICULTIES } from './config.js';

// Garde bien ton URL et ta Clé déjà configurées !
const SUPABASE_URL = "https://yztszszdkozflkxprbjh.supabase.co";
const SUPABASE_KEY = "sb_publishable_sar6i7TUqaim__NVMze7bA_CRxfVyg4";

export const NetworkEngine = {
    
    // Récupère le Top 10 filtré par difficulté ('normal' ou 'facile')
    async fetchTopScores(modeDifficulte = DIFFICULTIES.normal.id) {
        try {
            // L'API REST intégrée à ton Supabase
            const endpoint = `${NETWORK_CONFIG.supabaseUrl}/rest/v1/${NETWORK_CONFIG.tableScores}?select=pseudo,score,combo_max,temps&difficulte=eq.${modeDifficulte}&order=score.asc&limit=${NETWORK_CONFIG.limiteTopScores}`;

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'apikey': NETWORK_CONFIG.supabaseKey,
                    'Authorization': `Bearer ${NETWORK_CONFIG.supabaseKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
            return await response.json();
        } catch (err) {
            console.error("Erreur de récupération :", err.message);
            return [];
        }
    },

    // Envoie le score avec la difficulté jouée
    async submitScore(pseudo, score, comboMax, temps, modeDifficulte) {
        try {
            const endpoint = `${NETWORK_CONFIG.supabaseUrl}/rest/v1/${NETWORK_CONFIG.tableScores}`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'apikey': NETWORK_CONFIG.supabaseKey,
                    'Authorization': `Bearer ${NETWORK_CONFIG.supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    pseudo: pseudo || SECURITY_CONFIG.pseudoParDefaut,
                    score: score,
                    combo_max: comboMax,
                    temps: temps,
                    difficulte: modeDifficulte
                })
            });

            if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
            return { success: true };
        } catch (err) {
            console.error("Erreur d'envoi :", err.message);
            return { success: false, error: err.message };
        }
    }
};