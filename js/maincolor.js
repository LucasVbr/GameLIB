/*
 * maincolor.js
 *
 * @author Vabre Lucas
 */

/**
 * Fonction qui met la couleur
 * choisie par l'utilisateur
 * @param {String} color : blue / green / purple / red
 */
function SetMainColor(color) {
let colorNow = document.getElementById('color-set');

	if (color == "blue") { // Couleur bleu
		colorNow.className = "main-blue";
		localStorage.setItem('color', 'blue');
	} else if (color == "green") { // Couleur Verte
		colorNow.className = "main-green";
		localStorage.setItem('color', 'green');
	} else if (color == "purple") { // Couleur Violet
		colorNow.className = "main-purple";
		localStorage.setItem('color', 'purple');
	} else if (color == "red") { // Couleur rouge
		colorNow.className = "main-red";
		localStorage.setItem('color', 'red');
	} else { // Autres valeurs
		alert("Erreur: la couleur ne peut pas être mise à jour !");
	}
}

/**
 * Affichage de la couleur au demarrage de la page
 */
function MainColorOnLoad() {
	if (localStorage.getItem('color') == 'green') {
		SetMainColor("green");
	} else if (localStorage.getItem('color') == 'purple') {
		SetMainColor("purple");
	} else if (localStorage.getItem('color') == 'red') {
		SetMainColor("red");
	} else {
		SetMainColor("blue");
	}
}