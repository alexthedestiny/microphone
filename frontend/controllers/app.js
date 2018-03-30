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
  var chatbot = result;
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
	      } else {
	        interim_transcript += event.results[i][0].transcript;
	      }
	    }
	    final_transcript = capitalize(final_transcript);
	    document.getElementById("final_span").innerHTML = linebreak(final_transcript);
	    document.getElementById("interim_span").innerHTML = linebreak(interim_transcript);
	    if (final_transcript || interim_transcript) {
	      console.log('ok');
	    }
	  };
}
function startRecording(){
	console.log('start');
	$('#microphone-button').css('display','none');
	$('#microphone-button-slash').css('display','inline-block');
}
function stopRecording(){
	console.log('stop');
	$('#microphone-button').css('display','inline-block');
	$('#microphone-button-slash').css('display','none');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
