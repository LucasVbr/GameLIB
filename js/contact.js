/*
 * contact.js
 *
 * Programme d'envois du formulaire
 * Utilisé dans contact.html
 * 
 * @author Lilian Strub, Vabre Lucas, Nogaret Tristan
 */

/**
 * Envois du formulaire de contact
 * via le Webhook Discord du projet.
 * 
 * @param {String} prenom  : Prenom
 * @param {String} nom     : Nom
 * @param {int} age        : Age
 * @param {String} email   : Email
 * @param {int} tel        : Telephone
 * @param {String} message : Message à envoyer
 */
function SendContactMessage(prenom, nom, age, email, tel, message) {
	var lienWebhook = "https://discordapp.com/api/webhooks/788477579857494027/j7bfm7EJwk2x53pGU25HsdfXB-YWS36YS2hMH-D8LKaKSTeFJ9tnPWP1c1klXJSdOHbH";

	/* Envoi du formulaire */
	var request = new XMLHttpRequest();	// On crée une nouvelle requète
	request.open("POST", lienWebhook);	// On dit où l'on veut envoyer cette requète
	request.setRequestHeader('Content-type', 'application/json');	// On indique le format du contenu (ici du json)
	
	/* Le contenu de la requete */
	var params = {
		username:`${nom} ${prenom}`,
		avatar_url:"",  // Obligatoire, sinon envoi impossible
		content: `${message}\nage:${age}\nemail:${email}\ntel:${tel}`
	}
	request.send(JSON.stringify(params));	// Envoi de la requète

	/* Message qui valide l'envoi à l'utilisateur */
	alert("Votre demande a bien été envoyée.\nMerci !")

}