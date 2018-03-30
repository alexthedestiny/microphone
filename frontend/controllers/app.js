// import checkAgents from './checkAgents';
function getVisitorSetting(url) {
  return fetch(url)
  // .then(response => response.data.match(/\{.+\}/g)); // parses response to JSON
  .then(response => console.log(response.body)); // parses response to JSON
}

//Rejected escalation will display What else can I do for you? as a chatbotMessage
var rejectedEscalation={
  action:'displayChatbotMessage',
  value:'What else can I do for you?'
};
//NoAgentsAvailable will send NoAgentsAvailable to the API, and should match an intent, which answer will be displayed as a chatbotMessage.
var noAgentsAvailable={
  action:'intentMatch',
  value:'NoAgentsAvailable'
}
InbentaAuth = InbentaChatbotSDK.createFromDomainKey("eyJ0eXBlIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJwcm9qZWN0IjoiemFsYW5kb19jaGF0Ym90X2VuIiwiZG9tYWluX2tleV9pZCI6IkJXaWMzTGJMdGRtTlE4aVVfcGh6LUE6OiJ9.WR3AfmwVKGU7KQcslnS-lrlcTlD7Jyj2VTTikYGQiEjYzKHq6FwJ2cjadL0UiQk5Wb5m2knHKcti6dDrsmrbwA", "qhgFlQl5PuOW2NB+31ZDFX4fE7ABYFifd0K5tm0S4Fw=");
InbentaChatbotSDK.build(InbentaAuth, {
  lang:'en',
  answers:{
    answerAttributes: ['ANSWER_TEXT'],
    sideBubbleAttributes: ['SIDEBUBBLE_TEXT'],
    maxRelatedContents: 3,
  },
  adapters: [
    launchNLEsclationForm('ChatWithLiveAgentContactForm',rejectedEscalation,noAgentsAvailable,3)
  ],
  proactiveWelcome : true,
  delayOnAnswer: 700,
  usertype: 0,
  environment: "development",
  launcher: {
    title:"InbentaBotSDK"
  },
  labels: {
    en: {
      'yes' : 'Sure',
      'no' : 'Nope',
      'generic-error-message' : 'Please try to answer again',
      'enter-question' : 'Ask here',
      'interface-title' : 'SDK Demo',
      'guest-name' : 'You',
      'help-question' : 'What can I help you with?',
      'thanks' : 'Thank you!',
      'rate-content' : 'Did it help?',
      'form-message' : 'Please tell us why',
      'submit' : 'Send'
    }
  },
  ratingOptions: [
    {
      id: 1,
      label: 'yes',
      comment: false
    },
    {
      id: 2,
      label: 'no',
      comment: true
    }
  ],
}).then(function(result){
  var chatbot = window.chatbot = result;
  window.InbentaAuth = chatbot.api.apiAuth.authorization.token;
  jQuery.ajax({
    url: 'https://api.inbenta.io/v1/apis',
    method: 'GET',
    headers: {
      "authorization": window.InbentaAuth,
      "x-inbenta-key": "qhgFlQl5PuOW2NB+31ZDFX4fE7ABYFifd0K5tm0S4Fw=",
    },
    success: function(data) {
      window.apis = data.apis.chatbot;
      jQuery.ajax({
        method: 'POST',
        url: data.apis.chatbot + '/v1/conversation',
        headers: {
          "x-inbenta-key": "qhgFlQl5PuOW2NB+31ZDFX4fE7ABYFifd0K5tm0S4Fw=",
          "authorization": window.InbentaAuth,
          "x-inbenta-user-type": 0,
          "x-inbenta-env": "production"
        },
        success: function(data) {
          window.InbentaSessionToken = data.sessionToken;
        }
      });
    }
  });
  chatbot.api.addVariable('acme_airlines_en/Name', 'John Doe');
  // const messageData = {
  //   type:'answer',
  //   message:'Custom answer in conversationWindow',
  // }
  // chatbot.actions.displayChatbotMessage(messageData);
});
var recognizing;
var final_transcript = '';
var tempTramscript = '';
if (!('webkitSpeechRecognition' in window)) {
  alert('Ваш браузер не поддерживает API');
} else {
	var recognition = new webkitSpeechRecognition();
 	recognition.continuous = true;
  	recognition.interimResults = true;

  	recognition.onstart = function(){
  		recognizing = true;
  		$('#record-status').text('start recognition');
  	}
  	
   	recognition.onerror = function(event){
   		$('#record-status').text('recognition error');
   	}
   	recognition.onend = function(){
   		recognizing = false;
   	}
   	recognition.onresult = function(event) {
	    var interim_transcript = '';
	    if (typeof(event.results) == 'undefined') {
	      recognition.onend = null;
	      recognition.stop();
	      upgrade();
	      return;
	    }
	    for (var i = event.resultIndex; i < event.results.length; ++i) {
	      if (event.results[i].isFinal) {
	        final_transcript += event.results[i][0].transcript;
	        stopRecordingForce();
	      } else {
	        interim_transcript += event.results[i][0].transcript;
	      	tempTramscript = interim_transcript;
	      }
	    }
	    final_transcript = capitalize(final_transcript);
	    if(final_transcript.length===0){
	    	$("#inbenta-bot-input").attr('value', tempTramscript);
	    	$("#inbenta-bot-input").val(tempTramscript);
			$("#inbenta-bot-input").attr('placeholder', tempTramscript);
	    }else{
	    	$("#inbenta-bot-input").attr('value', final_transcript);
	    	$("#inbenta-bot-input").val(final_transcript);
			$("#inbenta-bot-input").attr('placeholder', final_transcript);
			// var e = jQuery.Event("keydown");
			// e.which = 32;
			// $("#inbenta-bot-input").focus().trigger(e);
	    }
	    
	    $("#inbenta-bot-input").focus(function(){
	    	console.log('focus');
	    	setTimeout(function(){
				$("#inbenta-bot-input").val($("#inbenta-bot-input").attr('value'));
				$("#inbenta-bot-input").attr('placeholder', $("#inbenta-bot-input").attr('value'));
	    	},0);
	    });
	    $("#inbenta-bot-input").blur(function(){
	    	setTimeout(function(){
				$("#inbenta-bot-input").val($("#inbenta-bot-input").attr('value'));
				$("#inbenta-bot-input").attr('placeholder', $("#inbenta-bot-input").attr('value'));
	    	},0);
	    });
	    $("#inbenta-bot-input").keypress(function(){
	    	setTimeout(function(){
	    		$("#inbenta-bot-input").attr('value', $("#inbenta-bot-input").val());
				$("#inbenta-bot-input").attr('placeholder', $("#inbenta-bot-input").attr('value'));
	    	},0);
	    });

		// $('.inbenta-bot-button').click(function(){
		// 	console.log('click send');
		// 	setTimeout(function(){
		// 		$("#inbenta-bot-input").attr('value','');
		// 		$("#inbenta-bot-input").val('');
		// 		$("#inbenta-bot-input").attr('placeholder', 'Ask here');
		// 	},0);
		// });

	    if (final_transcript || interim_transcript) {
	      console.log('ok');
	    }
	};
}
function startRecording(){
	$('#microphone-button').css('display','none');
	$('#microphone-button-slash').css('display','inline-block');
	final_transcript = '';
	recognition.lang = "ru-RU";
  	recognition.start();
}
function stopRecording(){
	$('#microphone-button').css('display','inline-block');
	$('#microphone-button-slash').css('display','none');
	recognition.stop();
	$("#inbenta-bot-input").attr('value', tempTramscript);
	setTimeout(function(){
		$("#inbenta-bot-input").val($("#inbenta-bot-input").attr('value'));
		$("#inbenta-bot-input").attr('placeholder', $("#inbenta-bot-input").attr('value'));
	},0);
	tempTramscript = '';
}
function stopRecordingForce(){
	$('#microphone-button').css('display','inline-block');
	$('#microphone-button-slash').css('display','none');
	recognition.stop();
}
$(document).on('click', '.inbenta-bot-button', ()=>{
	window.clickNaKnopku = $("#inbenta-bot-input").attr('value');
	jQuery.ajax({
        method: 'POST',
        url: window.apis + '/v1/conversation/message',
        headers: {
          "x-inbenta-key": "qhgFlQl5PuOW2NB+31ZDFX4fE7ABYFifd0K5tm0S4Fw=",
          "authorization": window.InbentaAuth,
          "x-inbenta-session": "Bearer " + window.InbentaSessionToken
        },
		data: {
			message: window.clickNaKnopku
		},
        success: function(data) {
        	var messageData = {
        		message: window.clickNaKnopku,
        	}
        	window.chatbot.actions.displayChatbotMessage(messageData);


        	const chatBotmessageData = {
			  type:'answer',
			  message:data.answers[answers.length-1].message
			}
			window.chatbot.actions.displayChatbotMessage(chatBotmessageData);
        }
    });
	setTimeout(()=>{
		$("#inbenta-bot-input").attr('value','');
		$("#inbenta-bot-input").val('');
		$("#inbenta-bot-input").attr('placeholder', 'Ask here');
		console.log('click');

	},500);
});

//helpers
var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
