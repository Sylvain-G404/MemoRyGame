// 1. On importe tes 3 fonctions de dessin (vérifie bien les noms exacts de tes 3 fichiers !)
import { dessinerLogoExterne } from './logo_externe.js';
import { dessinerLogoInterne } from './logo_interne.js';
import { dessinerLettresPseudo } from './logo_centre.js';

export function genererLogoStatique() {
    const canvas = document.createElement("canvas");
    const contexte = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 512;

    // 1. On dessine l'extérieur et l'intérieur à leur position d'origine
    dessinerLogoExterne(contexte);
    dessinerLogoInterne(contexte);

    // 2. On affiche toutes les lettres de "KIIRRA" à pleine opacité (1.0)
    const opacitesMax = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
    dessinerLettresPseudo(contexte, opacitesMax);

    // 3. On convertit en image une seule fois et on l'envoie au CSS !
    const imageFrame = canvas.toDataURL("image/webp");
    document.documentElement.style.setProperty("--logo-anime-image", `url(${imageFrame})`);

}
