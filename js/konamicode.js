/*
 * konamicode.js
 * @author Villeneuve Noé
 */
const pressed = [];
    	const secretCode = 'cookie';

		window.addEventListener('keyup', (e) => {
			/*console.log(e.key);*/
			pressed.push(e.key);
			pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
			if (pressed.join('').includes(secretCode)) {
				/*console.log('DING DING !');*/
				window.open('html\\clicker.html')
			}
			/*console.log(pressed);*/
		});
		
function indiceEasterEgg() {
	alert("Le Konami Code est un code de triche s'activant lorsque"
		  + " une suite de touches est pressée dans le bon ordre."
		  + " Quelle suite pourrait bien faire apparaître ce cookie ?...");
}

function disparitionCookieConsent() {
	var x = document.getElementById("cookieConsent");
	x.style.display = "none";
}