const request = require('request');

const config = require('./config');

// Handles messages events
function handleMessage(sender_psid, received_message) {
	let response;

	// Check if message contains text
	if(received_message.text) {
		// Create the payload for a basic text message
		response = {
			"text": `Okay, so you told me to: "${received_message.text}". Now send me noods ;)`
		};
	} else if(received_message.attachments) {
		// Get the URL of the message's attachment
		let attachment_url = received_message.attachments[0].payload.url;
		response = {
			"attachment": {
		        "type": "template",
		        "payload": {
		        	"template_type": "open_graph",
		        	"elements": [
		        		{
		        			"url": attachment_url,
		        			"buttons": [
		        				{
					                "type": "postback",
					                "title": "Yes! This is my audio file :)",
					                "payload": "yes",
				              	},
				              	{
					                "type": "postback",
					                "title": "No! This is not my audio file :(",
					                "payload": "no",
				              	}
		        			]
		        		}
		        	]
		        }
	        }
		}
	}

	callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

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