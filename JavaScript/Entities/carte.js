export class Carte {
    constructor(valeur, couleur, symbole) {
        this.valeur = valeur;     // Ex: "As", "V", "10"
        this.couleur = couleur;   // "Rouge" ou "Noir"
        this.symbole = symbole;   // "Coeur", "Carreau", "Pique", "Trefle"
        
        this.estRetournee = false;
        this.estTrouvee = false;
        this.domElement = null;
    }

    // Traduit le nom de la famille en vrai symbole graphique
    getIconeSymbole() {
        const icones = {
            'Coeur': '♥',
            'Carreau': '♦',
            'Pique': '♠',
            'Trefle': '♣'
        };
        return icones[this.symbole] || '';
    }

    // Génère la structure HTML exacte attendue par ton carte.css
    render(index) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('carte');
        cardDiv.dataset.index = index;
        
        this.domElement = cardDiv;
        const icone = this.getIconeSymbole();
        const classeCouleur = this.symbole.toLowerCase(); // applique .coeur, .pique, etc.
        
        // On injecte tes classes : .carte-front pour la valeur, .carte-back pour ton logo animé !
        cardDiv.innerHTML = `
            <div class="carte-inner">
                <div class="carte-front ${classeCouleur}">
                    <div class="corner top-left">${this.valeur}<br>${icone}</div>
                    <div class="center">${icone}</div>
                    <div class="corner bottom-right">${this.valeur}<br>${icone}</div>
                </div>
                <div class="carte-back"></div>
            </div>
        `;
        
        return cardDiv;
    }

    // Active ta classe CSS .flip
    retourner() {
        if (this.estRetournee || this.estTrouvee) return false;
        
        this.estRetournee = true;
        this.domElement?.classList.add('flip');
        return true;
    }

    // Retire ta classe CSS .flip
    masquer() {
        this.estRetournee = false;
        this.domElement?.classList.remove('flip');
    }

    // Active ta classe CSS .matched
    valider() {
        this.estTrouvee = true;
        this.domElement?.classList.add('matched');
    }
}
