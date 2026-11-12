import { SECURITY_CONFIG } from './config.js';

export const SecurityEngine = {
    listeNoire: [],
    // Mots courts qui causent des faux positifs s'ils sont cherchés à l'intérieur d'un mot
    motsStricts: SECURITY_CONFIG.motsStricts,

    async chargerFiltre() {
        try {
            // Toujours relatif à index.html (la racine) !
            const response = await fetch(SECURITY_CONFIG.cheminMotsInterdits);
            const data = await response.json();
            this.listeNoire = data.motsInterdits || [];
        } catch (err) {
            console.warn("Impossible de charger le filtre des mots :", err);
        }
    },

    validerPseudo(pseudoBrut) {
        if (!pseudoBrut) return { valide: false, message: "Pseudo vide." };

        // 1. Nettoyage XSS et caractères spéciaux
        const pseudoPropre = pseudoBrut.trim().replace(/[^a-zA-Z0-9_-]/g, '');

        // 2. Vérification de la longueur (min et max conseillé pour l'affichage)
        if (pseudoPropre.length < SECURITY_CONFIG.pseudoMinLength || pseudoPropre.length > SECURITY_CONFIG.pseudoMaxLength) {
            return { 
                valide: false, 
                message: `Entre ${SECURITY_CONFIG.pseudoMinLength} et ${SECURITY_CONFIG.pseudoMaxLength} caractères requis.` 
            };
        }

        // 3. Normalisation anti-contournement (minuscules + remplacement des chiffres)
        const pseudoNormalise = pseudoPropre
            .toLowerCase()
            .replace(/0/g, 'o')
            .replace(/1/g, 'i')
            .replace(/3/g, 'e')
            .replace(/4/g, 'a')
            .replace(/5/g, 's')
            .replace(/7/g, 't')
            .replace(/8/g, 'b');

        // 4. Vérification intelligente
        const contientInsulte = this.listeNoire.some(mot => {
            // Si c'est un mot court à risque, on vérifie qu'il est isolé (ex: "con", "le_con", "con-12")
            if (this.motsStricts.includes(mot)) {
                const regexMotEntier = new RegExp(`(^|[_-])${mot}([_-]|[0-9]|$)`);
                return regexMotEntier.test(pseudoNormalise);
            }
            // Sinon, on bloque même s'il est collé à d'autres lettres (ex: "superconnard")
            return pseudoNormalise.includes(mot);
        });

        if (contientInsulte) {
            return { valide: false, message: "Ce pseudo contient un terme interdit !" };
        }

        return { valide: true, pseudoPropre: pseudoPropre };
    }
};
