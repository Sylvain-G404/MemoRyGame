# 🧠 MemoRyGame

Un jeu de mémoire en JavaScript où le joueur doit retrouver des paires de cartes en minimisant son score.

Le projet a évolué d’une version simple de cartes statiques vers une V2 avec logique de jeu complète, score, combo, animations et gestion du son.

## ![MemoRyGame](<Screen_Site/Screenshot 2026-10-26 at 06-36-07 MemoRyGame.png>)

---

## 🎮 Objectif du jeu

Retrouver les paires de cartes en faisant le moins de points possible.

- Chaque clic révèle une carte
- Deux cartes sont comparées
- Si elles correspondent → match
- Sinon → elles se retournent

---

## 🧩 Règles de jeu

### ✔ Match valide

- Même valeur
- Même famille (rouge / noir)

### ❌ Match invalide

- +1 point
- combo reset

---

## 🔥 Système de score

- ❌ Erreur → +1 point
- ✔ Match → combo augmente
- 🔥 Combo ≥ 2 → -1 point par match consécutif
- 💀 Combo reset → retour normal

👉 Objectif : obtenir le score le plus bas possible

---

## 🔊 Système son

- Son de flip sur interaction
- Activation uniquement après interaction utilisateur
- Toggle ON/OFF disponible

---

## 📁 Structure du projet

```bash
C:.\MemoRyGame
+--- index.html
+--- JavaScript
|   +--- class.js
|   +--- main.js
|   +--- songCarte.js
|   \--- Animation_Logo
|       +--- logo_anime.js
|       +--- logo_centre.js
|       +--- logo_externe.js
|       +--- logo_interne.js
|       \--- main.js
+--- Sounds
|   \--- flipcard.mp3
\--- Style
    +--- carte.css
    +--- main.css
    +--- style.css
    +--- table.css
    \--- Animation_Logo
        \--- style.css
```

## 🧠 Architecture

### class.js

Contient la logique métier du jeu :

- `Carte`
  - valeur
  - couleur
  - famille (rouge / noir)
  - méthodes de comparaison :
    - `estMemeValeur()`
    - `estMemeFamille()`
    - `estMatch()`
  - génération HTML de la carte

- `Deck`
  - création du paquet de cartes
  - mélange des cartes (shuffle)

---

### main.js

Contient la logique principale du jeu :

- affichage des cartes dans le DOM
- gestion des clics utilisateur
- sélection des deux cartes (première / deuxième)
- gestion des états :
  - flip
  - matched
  - bloque
- comparaison des cartes
- gestion du score et du combo
- interaction globale avec le DOM

---

### songCarte.js

Contient la gestion du son :

- lecture du son de flip
- activation / désactivation via toggle
- protection anti spam audio
- contrôle de l’état sonore global

---

### 🕒 Animation temporelle du logo — Identité visuelle dynamique

L'une des particularités de MemoRyGame est l'utilisation de mon propre logo animé comme motif sur le dos des cartes.

Plutôt que d'utiliser une image statique, j'ai développé un système d'animation temporelle entièrement généré en JavaScript à l'aide de Canvas HTML5.

### ⚙️ Architecture graphique

L'animation repose sur un Canvas virtuel de 512 × 512 pixels, créé directement en mémoire du navigateur, sans être intégré au DOM.

Le dessin est réparti en plusieurs modules indépendants :

- **logo_externe.js** : construction du cadran extérieur et de ses 12 repères.
- **logo_interne.js** : dessin du Double K central.
- **logo_centre.js** : positionnement des lettres constituant le pseudo.
- **logo_anime.js** : moteur temporel, rotations, effets dynamiques et synchronisation générale.
- **main.js** : initialisation du Canvas et des variables nécessaires au fonctionnement du système.

### ⏱️ Moteur temporel et rotations synchronisées

L'animation dispose de sa propre horloge interne, indépendante de l'heure réelle.

Son fonctionnement repose sur une progression temporelle volontairement découpée en crans successifs, plutôt que sur une rotation parfaitement fluide.

Ce choix graphique rappelle le mécanisme d'une horloge traditionnelle : un mouvement rythmé, presque mécanique, qui donne au logo son propre caractère.

Le cadran externe et le Double K central effectuent des rotations synchronisées, mais dans des directions opposées.

Le cycle de rotation est basé sur une période de 48 secondes simulées, correspondant à une progression angulaire de 7,5° par seconde.

### 🔥 Effets dynamiques

Plusieurs effets viennent enrichir le rendu graphique :

- **Effet thermique** : une coloration progressive fait évoluer le blanc vers des teintes orangées puis rouges, selon l'intensité thermique.
- **Vibration dynamique** : un léger déplacement du cadran externe est proportionnel à l'intensité thermique.
- **Ghost Scanner** : les branches du Double K agissent comme un scanner circulaire. Lorsqu'elles passent devant les positions des lettres, celles-ci deviennent lumineuses avant de retrouver leur faible opacité initiale.

Ces effets sont calculés indépendamment du dessin géométrique, ce qui permet de conserver une architecture modulaire.

### 🖼️ Transmission vers les cartes

Le résultat graphique du Canvas est converti en image au format WebP grâce à `canvas.toDataURL()`.

L'image générée est ensuite injectée dynamiquement dans une propriété CSS personnalisée globale :

`--logo-anime-image`

Cette variable est utilisée directement par les faces arrière des cartes via `background-image`.

Ainsi, toutes les cartes partagent la même source graphique animée, sans avoir besoin de créer un Canvas individuel pour chacune d'elles.

### 🎯 Objectifs et compétences techniques

Cette réalisation m'a permis d'expérimenter plusieurs aspects de JavaScript et du développement graphique :

- Manipulation avancée de Canvas 2D.
- Transformations géométriques et rotations.
- Gestion d'une horloge interne indépendante.
- Calculs trigonométriques.
- Gestion de boucles d'animation avec `requestAnimationFrame`.
- Composition graphique et gestion des opacités.
- Communication dynamique entre JavaScript et CSS.
- Génération et diffusion d'images WebP en temps réel.

**Le résultat :** une identité visuelle vivante, générée en temps réel, avec un mouvement volontairement cadencé qui rappelle le tic-tac d'une horloge et qui est directement intégré à l'expérience de jeu.

---

## 🚀 Évolutions futures (V3 / V4)

- ajout d’un menu options (3 tirets)
- personnalisation du jeu :
  - couleur du fond
  - dos des cartes
  - taille des cartes
- choix de difficulté :
  - facile
  - normal
  - difficile
- refactor du code :
  - séparation game / ui / settings
- amélioration des animations (flip + transitions)
- ajout de modes de jeu

---

## 👤 À propos de l'Auteur

Ce projet a été développé avec passion par **KiirrA** (Sylvain-G404), développeur indépendant spécialisé dans la création d'outils d'automatisation légers, d'architectures logicielles découplées et d'interfaces web dynamiques.

N'hésitez pas à laisser une ⭐️ sur ce dépôt pour soutenir le projet !

- **GitHub :** [@Sylvain-G404](https://github.com/Sylvain-G404)
- **Portfolio :** [Mon-Portfolio-Temps](https://sylvain-g404.github.io/Mon-Portfolio-Temps/)

_« Coder sans limites. »_
