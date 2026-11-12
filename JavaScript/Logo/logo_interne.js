export function dessinerLogoInterne(contexte) {

    const centreX = 256;
    const centreY = 256;

    // ==================================================
    // GÉOMÉTRIE DU DOUBLE K (Agrandie de 40%)
    // ==================================================
    const longueur = 100 * 1.8;
    const largeur = 8 * 1.8;

    const positionBarre = 0;
    const decalageBranche = 10 * 1.8;
    const positionDepartBranche = 15 * 1.8;

    const longueurBranche = 45 * 1.8;
    const hauteurBranche = 45 * 1.8;

    contexte.lineCap = "round";
    contexte.lineWidth = largeur;
    contexte.strokeStyle = "#ffffff";

    // ==================================================
    // POSITIONNEMENT DU LOGO
    // ==================================================

    contexte.save();

    contexte.translate(centreX, centreY);

    // ==================================================
    // PREMIER K
    // ==================================================

    // --------------------------------------------------
    // BARRE VERTICALE
    // --------------------------------------------------

    contexte.beginPath();

    contexte.moveTo(positionBarre, -longueur / 2);
    contexte.lineTo(positionBarre, longueur / 2);

    contexte.stroke();

    // --------------------------------------------------
    // BRANCHE SUPÉRIEURE
    // --------------------------------------------------

    contexte.beginPath();

    contexte.moveTo(positionBarre, positionDepartBranche);
    contexte.lineTo(longueurBranche, -hauteurBranche);

    contexte.stroke();

    // --------------------------------------------------
    // BRANCHE INFÉRIEURE
    // --------------------------------------------------

    contexte.beginPath();

    contexte.moveTo(decalageBranche, decalageBranche);
    contexte.lineTo(longueurBranche, longueurBranche);

    contexte.stroke();

    // ==================================================
    // DEUXIÈME K INVERSÉ
    // ==================================================

    contexte.save();

    // Rotation de 180° pour inverser le K
    contexte.rotate(Math.PI);

    // --------------------------------------------------
    // BRANCHE SUPÉRIEURE
    // --------------------------------------------------

    contexte.beginPath();

    contexte.moveTo(positionBarre, positionDepartBranche);
    contexte.lineTo(longueurBranche, -hauteurBranche);

    contexte.stroke();

    // --------------------------------------------------
    // BRANCHE INFÉRIEURE
    // --------------------------------------------------

    contexte.beginPath();

    contexte.moveTo(decalageBranche, decalageBranche);
    contexte.lineTo(longueurBranche, longueurBranche);

    contexte.stroke();

    // Fin du deuxième K
    contexte.restore();
    
    // ==================================================
    // FIN DU LOGO INTERNE
    // ==================================================

    contexte.restore();
}