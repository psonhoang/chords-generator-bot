function getStarted() {
	let response = {
		'text': 'Hi, there! Chordsky can generate accompaniment chords that are personal to your vocals. To get started, please record yourself singing a song that you would like to have accompaniment.'
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

function wrongAudio() {
	let response = {'text': 'Oof... try sending another audio file then'};
	return response;
}

function correctAudio() {
	let response = {'text': 'Nice! We will now generate chords for your audio. Please wait...'};
	return response;
}

function finished() {
	let response = {
		"attachment": {
	        "type": "template",
	        "payload": {
	        	"template_type": "button",
	        	"text": "Your chords have been generated!",
	        	"buttons":[
    				{
		                "type": "postback",
		                "title": "Try with another vocals",
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

module.exports = {
	getStarted,
	audioResponse,
	checkAudio,
	wrongAudio,
	correctAudio,
	finished
}