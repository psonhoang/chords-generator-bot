const request = require('request');

const config = require('./config');

// Handles messages events
function handleMessage(sender_psid, received_message) {
	let response;

	// Check if message contains text
	if(received_message.text) {
		// Create the payload for a basic text message
		response = {
			"text": `Okay, so you told me to: "${received_message.text}". Send me your audio!`
		};
	} else if(received_message.attachments) {
		// Get the URL of the message's attachment
		let attachment_url = received_message.attachments[0].payload.url;
		let received_audio_response = {
			'attachment': {
				'type': 'audio',
				'payload': {
					'url': attachment_url,
					'is_reusable': true
				}
			}
		};
		// Preview sent audio
		callSendAPI(sender_psid, received_audio_response);
		response = {
			"attachment": {
		        "type": "template",
		        "payload": {
		        	"template_type": "button",
		        	"text": "Is that the audio file you just sent?",
		        	"buttons":[
        				{
			                "type": "postback",
			                "title": "Yes!",
			                "payload": "yes",
		              	},
		              	{
			                "type": "postback",
			                "title": "No!",
			                "payload": "no",
		              	}
		        	]
		        }
	        }
		};
	}

	callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
	let response;

	// Get the payload for the postback
	let payload = received_postback.payload;

	// Set the response based on the postback payload
	if(payload == 'yes') {
		response = {'text': 'Nice! We will know generate chords for your audio...'};
	} else if (payload == 'no') {
		response = {'text': 'Oof... try sending another audio file then'};
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
  	request({
	    "uri": "https://graph.facebook.com/v2.6/me/messages",
	    "qs": { "access_token": config.PAGE_ACCESS_TOKEN },
	    "method": "POST",
	    "json": req_body
	  }, (err, res, body) => {
	    if (!err) {
	      console.log('message sent!')
	    } else {
	      console.error("Unable to send message:" + err);
    }
  	}); 
}

module.exports = {
	handleMessage,
	handlePostback,
	callSendAPI
};