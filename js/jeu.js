/* 
 * jeu.js
 *
 * Script qui manipule les données des jeux
 * contenues dans data.js
 *  
 * @author Vabre Lucas, Sers Lucas
 */


/* Algorithme qui récupère la valeur de la variable contenue dans l'URL */
let $_GET = {};	// Creer l'objet GET
if(document.location.toString().indexOf('?') != -1) {	// Verifie si il y a un ? dans l'url
	var query = document.location	// Modifie quelques caractères qui pourrais être mal interprété
						.toString()
						.replace(/^.*?\?/, '')
						.replace(/#.*$/, '')
						.split('&');

	/* Tout ce qu'il se trouve apres le ? va etre traité */
	for(var i=0, l=query.length; i<l; i++) {
		var aux = decodeURIComponent(query[i]).split('=');	// Ce qu'il y a gauche de l'égal est le nom de la variable
		$_GET[aux[0]] = aux[1];								// et ce qu'il a a droite est la valeur de celle-ci
	}
}

/**
 * Fonction qui calcule la promotion
 * @param {Double} promoValue : Le pourcentage de la promotion
 * @param {int} price 		  : Le prix original de la promo
 */
function CalcPromo(promoValue, price) {
	return ((1 - promoValue / 100) * price ).toFixed(2)
}

/**
 * Créer plus facilement et lisiblement une balise <tr></tr>
 * @param {String} content  : Contenu du tr
 * @param {String} argument : Argument
 */
function MakeTr(content, argument) {
	return ('<tr ' + argument + '>' + content + '</tr>');
}

/**
 * Créer plus facilement et lisiblement une balise <td></td>
 * @param {String} content  : Contenu du td
 * @param {String} argument : Argument
 */
function MakeTd(content, argument) {
	return ('<td ' + argument + '>' + content + '</td>');
}

/**
 * Créer plus facilement et lisiblement une balise <th></th>
 * @param {String} content  : Contenu du th
 * @param {String} argument : Argument
 */
function MakeTh(content, argument) {
	return ('<th ' + argument + '>' + content + '</th>');
}

/**
 * Créer plus facilement et lisiblement une balise <a></a>
 * @param {String} content  : Contenu du a
 * @param {String} argument : Argument
 */
function MakeA(content, argument) {
	return ('<a ' + argument + '>' + content + '</a>');
}

/**
 * Créer plus facilement et lisiblement une balise <img/>
 * @param {String} argument : Argument
 */
function MakeImg(argument) {
	return ('<img ' + argument + '/>');
}

/**
 * Fonction qui permet le bon affichage de jeu.html
 * en récuperant la variable id dans l'url, puis en
 * affichant les elements du jeu (de cet id) sur les
 * element de la page
 */
function PageJeu () {

	/* Initialisation des variables */
	let id = parseInt($_GET["id"]);
	let gameElement = game[id];

	let title1 = document.getElementById("game-title-0");
	let title2 = document.getElementById("game-title-1");
	let title3 = document.getElementById("game-title-2");
	let description = document.getElementById("game-description");
	let developper = document.getElementById("dev");
	let editor = document.getElementById("editor");
	let pegi = document.getElementById("pegi");
	let price = document.getElementById("price");
	let payButton = document.getElementById("pay-button");
	let ingame = document.getElementById("picture-ingame");	// Image sous la vidéo
	let gameLogo = document.getElementById("picture-logo");
	let video = document.getElementById("video");	// Lien de la video

	if (-1 < id && id <= (game.length - 1)) {
		/* Affectation des elements */
		title1.innerHTML += gameElement.name;
		title2.innerHTML = gameElement.name;
		title3.innerHTML = gameElement.name;
		description.innerHTML = gameElement.info;
		developper.innerHTML = gameElement.developper;
		editor.innerHTML = gameElement.editor;
		pegi.innerHTML = gameElement.classification;

		/* Affichage des immages */
		ingame.style.backgroundImage = "url('../" + gameElement.ingame + "')";
		ingame.alt = "Image de preview du jeu : " + gameElement.name;

		gameLogo.style.backgroundImage = "url('../" + gameElement.logo + "')";
		gameLogo.alt = "Logo du jeu : " + gameElement.name;

		video.src = "https://www.youtube.com/embed/" + gameElement.video + "?mute=1&autoplay=1";
		video.alt = "Video de présentation du jeu : " + gameElement.name;

		/* Prix */
		if (gameElement.price == 0) { // Jeu Gratuit
			price.innerHTML = '';
			payButton.value = 'Jouer';
		} else { // Jeu payant
			/* Calcul de la promotion si il y en à une */
			price.innerHTML = gameElement.isInPromo ? CalcPromo(gameElement.promo, gameElement.price)
										  : gameElement.price ;
			price.innerHTML += " €";
			payButton.value = 'Acheter'
		}
	} else { // Page non trouvée
		window.open("error.html");
	}
}

/**
* Fonction qui permet d'afficher sous forme de tableaux
* toutes les données stockées dans data.js.
* Utilisé en tant que commande de débugage,
* c'est pourquoi elle figure uniquement dans dev.html
*/
function ShowGameAll() {
	let gameList = document.getElementById('game-list').innerHTML;
	/* Affichage de l'entête du tableau */
	gameList = MakeTr(MakeTd('id')
					  + MakeTd('name') 
					  + MakeTd('price') 
					  + MakeTd('isInPromo') 
					  + MakeTd('promo') 
					  + MakeTd('info') 
					  + MakeTd('developper') 
					  + MakeTd('editor') 
					  + MakeTd('classification') 
					  + MakeTd('imgHorizontal') 
					  + MakeTd('imgVertical') 
					  + MakeTd('ingame') 
					  + MakeTd('video'),
					  'style="background-color: var(--overlay-color)"');

	for (let i = 0; i < game.length; i++) { // Affiche autant de lignes que d'elements dans la liste game
		gameList += MakeTr(MakeTd(game[i].id)
						   + MakeTd(game[i].name)
						   + MakeTd(game[i].price)
						   + MakeTd(game[i].isInPromo)
						   + MakeTd(game[i].promo)
						   + MakeTd(game[i].info)
						   + MakeTd(game[i].developper)
						   + MakeTd(game[i].editor)
						   + MakeTd(game[i].classification)
						   + MakeTd(game[i].imgHorizontal)
						   + MakeTd(game[i].imgVertical)
						   + MakeTd(game[i].ingame)
						   + MakeTd(game[i].video));
	}
}


/**
 * Affiche tout les jeux
 * (image + Nom + developpeur et prix)
 * Utilisé dans listeJeux.html
 */
function ShowGameList() {
	var element = document.getElementById('test');
	let price;
	let link;
	let image;

	for (let i = 0; i < game.length; i++) {
		link = "jeu.html?id=" + game[i].id;
		image = "../" + game[i].imgHorizontal;
		if (game[i].price == 0) {
			price = "Gratuit";
		} else {
			price = game[i].isInPromo ? CalcPromo(game[i].promo, game[i].price)
									  : game[i].price;
			price += " €";
		}

		element.innerHTML += MakeTr(MakeTh(game[i].id)
									+ MakeTd(MakeA(MakeImg('draggable="false" src="'
														   + image + '" alt="Image de : '
														   + game[i].name + '"'),
												   'href="' + link + '"'))
									+ MakeTd('<h3>' + MakeA(game[i].name, 'href="' + link + '"') + '</h3>')
									+ MakeTd('<p>' + game[i].developper + '</p>')
									+ MakeTd('<p class="price">' + price + '</p>'))
							 + MakeTr(MakeTd('<hr>','colspan="5"'));
	}
}

/**
 * Fonction qui permet d'automatiser la création de "cartes"
 * sur la page index.html.
 * 
 * @param card : l'élement cible qui a la classe "card"
 * @param disposition : deux valeurs possibles "vertical" ou "horizontal"
 *                      permet de produire une carte verticale ou horizontale
 * @param id : Valeur de l'id du jeu (voir dans data.js)
 * @param isIndex : boolean si cette fonction
 *					est executé dans index.html => true
 */
function CreateCard(card, disposition, id, isIndex) {
	let indexConvertor = [2];
	let link;
	let gamePricePromo;
	let priceShow;
	let image;

	image = (disposition == "vertical") ? game[id].imgVertical
										: game[id].imgHorizontal;

	if (isIndex) {
		indexConvertor[0] = "html\\";
		indexConvertor[1] = "";
	} else {
		indexConvertor[0] = "";
		indexConvertor[1] = "..\\";
	}
	link = indexConvertor[0] + "jeu.html?id=" + id;

	/* Calcul de l'éventuelle promotion */
	gamePricePromo = game[id].isInPromo ? CalcPromo(game[id].promo, game[id].price)
										: 0.0;

	/* Stockage de la partie "prix" */
	if (game[id].isInPromo) {/* Gestion de la promotion */
		priceShow = '<span class="tag">-' + game[id].promo + '%</span>'
					+ '<strike> ' + game[id].price +'€</strike> '
					+ gamePricePromo + '€'
	} else if(game[id].price == 0) { /* Si le jeu est gratuit */
		priceShow = 'Gratuit';
	} else {
		priceShow = game[id].price + '€';
	}

	/* Remplissage de la carte */
	card.innerHTML += MakeA(MakeImg('draggable="false" alt="Image de : ' + game[id].name + '" src="' + indexConvertor[1] + image + '"'),
					  	    'href="' + link + '" class="card-picture ' + disposition + '"')
					  + '<div class="card-info">'
					  + 	MakeA('<h3 class="card-title">' + game[id].name + '</h3>', 'href="' + link + '"')
					  + 	'<h4 class="card-editor">' + game[id].editor + '</h4>'
					  + 	'<p class="card-price">' + priceShow + '</p>'
					  + '</div>';
}