var express = require('express');
var router = express.Router();
const speech = require('@google-cloud/speech');
const fs = require('fs');
const client = new speech.SpeechClient();

router.get('/', function(req, res) {
	const fileName = './someaudio.flac';
	const file = fs.readFileSync(fileName);
	const audioBytes = file.toString('base64');
	const audio = {
	  	content: audioBytes,
	};
	const config = {
	  	encoding: 'LINEAR16',
	  	sampleRateHertz: 16000,
	  	languageCode: 'en-US',
	};
	const request = {
	  	audio: audio,
	  	config: config,
	};
	client
	  	.recognize(request)
	  	.then(data => {
	    	const response = data[0];
	    	const transcription = response.results
	      		.map(result => result.alternatives[0].transcript)
	      		.join('\n');
	    	console.log(`Transcription: ${transcription}`);
	  	})
	  		.catch(err => {
	    	console.error('ERROR:', err);
	  	});

  	console.log('recognize');
  	res.send('recognizer here');
  	res.sendStatus(200);
});

module.exports = router;