const request = require('request');
const shell = require('shelljs');

const config = require('./config');
const responses = require('./responses');

// Handles messages events
function handleMessage(sender_psid, received_message) {
	let response;

	// User's current conversation state
	let currentState = global.users[sender_psid].currentState;

	console.log("[DEBUG] currentState = " + currentState);

	if(currentState == 'initial') {
		response = responses.getStarted();
		global.users[sender_psid].currentState = 'sendRec';
	} else if(currentState == 'sendRec') {
		if(received_message.attachments && received_message.attachments[0].type == 'audio') {
			// Get the URL of the message's attachment
			let attachment_url = received_message.attachments[0].payload.url;
			console.log("[DEBUG] url: " + attachment_url);
			let received_audio_response = responses.audioResponse(attachment_url);
			// Preview sent audio
			callSendAPI(sender_psid, received_audio_response);
			response = responses.checkAudio(attachment_url);
			global.users[sender_psid].currentState = 'checkRec';
		} else {
			response = responses.notAudioFile();
		}
	} else if(currentState == 'checkRec') {
		response = responses.notConfirmed();
	} else if(currentState == 'finished') {
		response = responses.finished(sender_psid);
	}

	// Check if message contains text
	// if(received_message.text) {
	// 	// Create the payload for a basic text message
	// 	response = {
	// 		"text": `Okay, so you told me to: "${received_message.text}". Send me your audio!`
	// 	};
	// } else if(received_message.attachments) {
		
	// }

	callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
	let response;

	// User's current conversation state
	let currentState = global.users[sender_psid].currentState;

	// Get the payload for the postback
	let payload = received_postback.payload;

	// Set the response based on the postback payload
	if(payload != 'no' && currentState == 'checkRec') {
		confirm_response = responses.correctAudio();
		callSendAPI(sender_psid, confirm_response);

		//TODO: Script to generate chords
		shell.exec("bash ./io/convert-wav.sh " + payload.toString() + " " + sender_psid.toString());

		response = responses.finished(sender_psid);
		global.users[sender_psid].currentState = 'finished';
	} else if (payload == 'no' && currentState == 'checkRec') {
		response = responses.wrongAudio();
		global.users[sender_psid].currentState = 'sendRec';
	} else if (payload == 'try_again' && currentState == 'finished') {
		response = responses.getStarted();
		global.users[sender_psid].currentState = 'sendRec';
	} else if (payload == 'done' && currentState == 'finished') {
		response = responses.goodbye();
		global.users[sender_psid].currentState = 'initial';
	}

	// Send a message to acknowledge the postback
	callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  	// Construct message body
	let req_body = {
		"recipient": {
			"id": sender_psid
		},
		"message": response
	};

	// Send the HTTP request to the Messenger Platform
  	request(
  		{
		    "uri": "https://graph.facebook.com/v2.6/me/messages",
		    "qs": { "access_token": config.PAGE_ACCESS_TOKEN },
		    "method": "POST",
		    "json": req_body
		}, 
		(err, res, body) => {
		    if (!err) {
		      console.log('message sent!');
		    } else {
		      console.error("Unable to send message:" + err);
    		}
  		}
  	); 
}

module.exports = {
	handleMessage,
	handlePostback,
	callSendAPI
};