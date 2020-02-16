const config = require('./config');

function getStarted() {
	let response = {
		'text': 'Hi, there! Chordsky can generate accompaniment chords that are personal to your vocals. To get started, please record yourself singing a song that you would like to have an accompaniment =)'
	};
	return response;
}

function audioResponse(audio_url) {
	let response = {
		'attachment': {
			'type': 'audio',
			'payload': {
				'url': audio_url,
				'is_reusable': true
			}
		}
	};
	return response;
}

function checkAudio() {
	let response = {
		"attachment": {
	        "type": "template",
	        "payload": {
	        	"template_type": "button",
	        	"text": "Is this the audio file you just sent?",
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
	return response;
}

function notAudioFile() {
	let response = {'text': "I don't think you sent an audio file... Please try again"};
	return response;
}

function notConfirmed() {
	let response = {'text': 'Please confirm that the file attached above is your audio first'};
	return response;
}

function wrongAudio() {
	let response = {'text': 'Oof... try sending another audio file then'};
	return response;
}

function correctAudio() {
	let response = {'text': 'Nice! We will now generate chords for your audio. Please wait...'};
	return response;
}

function finished(sender_psid) {
	let response = {
		"attachment": {
	        "type": "template",
	        "payload": {
	        	"template_type": "button",
	        	"text": "Your chords have been generated!",
	        	"buttons":[
	        		{
	        			"type": "web_url",
	        			"url": config.REQUEST_URL + 'synthcalibrate2.midi',
        				"title": "Your sick chords"
	        		},
    				{
		                "type": "postback",
		                "title": "Try another one",
		                "payload": "try_again",
	              	},
	              	{
		                "type": "postback",
		                "title": "I'm done here",
		                "payload": "done",
	              	}
	        	]
	        }
        }
	};
	return response;
}

function goodbye() {
	let response = {'text': 'Bye bye then!'};
	return response;
}

module.exports = {
	getStarted,
	audioResponse,
	checkAudio,
	notAudioFile,
	notConfirmed,
	wrongAudio,
	correctAudio,
	finished,
	goodbye
}