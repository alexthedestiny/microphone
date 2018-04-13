var isFirefox = window.isFirefox = typeof InstallTrigger !== 'undefined';
window.isFocus = false;
var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
if( $(window).width()>768 ){
  setTimeout(function(){
    captureMicrophone(function(mic) {
      microphone = mic;
      if(isSafari) {
          replaceAudio();

          audio.muted = true;
          setSrcObject(microphone, audio);
          window.flag = true;
          return;
      }
      // touch(btnStartRecording);
      // if($(window).width()>768){
      //   var event = $.Event( "touchstart" );
      //   $(btnStartRecording).trigger(event);
      // }
    });
  }, 2000);
}


if(isSafari) {
  setTimeout(function() {
    jQuery('#microphone-button-taphold').trigger('touchstart');
  }, 1000);
}

$(function(){
  if( $(window).width()>768 ){
    var recorderEnable = false;
    $('#microphone-button-taphold').mousedown(function(){
      console.log('down');
      var event = $.Event( "touchstart" );
      $(btnStartRecording).trigger(event);
      recorderEnable = true;
    });
    $('#microphone-button-taphold').mouseup(function(){
      console.log('up');
      if(recorderEnable){
        recorderEnable = false;
        var event = $.Event( "touchend" );
        $(btnStartRecording).trigger(event);
      }
    });
    $('#microphone-button-taphold').mouseleave(function(){
      console.log('up');
      if(recorderEnable){
        recorderEnable = false;
        var event = $.Event( "touchend" );
        $(btnStartRecording).trigger(event);
      }
    });
  }
  else {
    document.getElementById('microphone-button-taphold').addEventListener('touchend', function(event) {
        micHoldUp();
    }, false);
  }
});

var mSeconds = 0;
var isRecording = false;
window.counter = 0
function micHoldUp(){
  if(isRecording){
    isRecording = false;
    $('#microphone-button-taphold').removeClass('holded');
    if(isEdge){
      $('#microphone-button-taphold').removeClass('holded-edge');
    }
    $('.loader-wrapp>img').removeClass('visibleLoader');
    $('.loader-wrapp>span').addClass('visibleText');
    clearInterval(window.timerInterval);
    click(btnStopRecording);
  }
}

function getVisitorSetting(url) {
  return fetch(url)
  // .then(response => response.data.match(/\{.+\}/g)); // parses response to JSON
  .then(response => console.log(response.body)); // parses response to JSON
}
var rejectedEscalation={
  action:'displayChatbotMessage',
  value:'What else can I do for you?'
};

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
  chatbot.actions.showConversationWindow();
  setTimeout(function(){
    jQuery('.ui-draggable').attr('style', 'bottom: 120px; right: 15px; position: relative;');
  },0);
  window.neededToShow = true;
  $("#inbenta-bot-input").focus(function(){
    window.isFocus = true;
    setTimeout(function(){
      var attr = jQuery("#inbenta-bot-input").attr('data-value');
      console.log(attr);
      if (typeof attr !== typeof undefined && attr !== false) {
        jQuery("#inbenta-bot-input").val(jQuery("#inbenta-bot-input").attr('data-value'));
      }
    },0);
  });
  $("#inbenta-bot-input").blur(function(){
    window.isFocus = false;
    setTimeout(function(){
      var attr = jQuery("#inbenta-bot-input").attr('data-value');
      if (typeof attr !== typeof undefined && attr !== false) {
        jQuery("#inbenta-bot-input").val(jQuery("#inbenta-bot-input").attr('data-value'));
      }
    },0);
  });
  $("#inbenta-bot-input").keyup(function(e){
    setTimeout(function(){
      var code = e.keyCode ? e.keyCode : e.which;
      if (code==13) {
          e.preventDefault();
          console.log('enter pressed');
          var messageData = {
            message: $("#inbenta-bot-input").val()
          }
          window.chatbot.actions.displayUserMessage(messageData);
          window.chatbot.actions.sendMessage(messageData);
          setTimeout(function(){
            jQuery("#inbenta-bot-input").attr('data-value','');
            jQuery("#inbenta-bot-input").val('');
            jQuery("#inbenta-bot-input").attr('placeholder', 'Ask here');
          }, 500);
          return;
      }
      jQuery("#inbenta-bot-input").attr('data-value', $("#inbenta-bot-input").val());
      console.log($("#inbenta-bot-input").val());
    },0);
  });
  $(document).keypress(function(e) {
    if(e.which == 13) {
      if(window.isFocus) {
        jQuery("#inbenta-bot-input").attr('data-value','');
      }
    }
});
  $(document).on('click', '.inbenta-bot-button', function(){
    window.clickNaKnopku = jQuery("#inbenta-bot-input").attr('data-value');
    var messageData = {
      message: window.clickNaKnopku
    }
    window.chatbot.actions.displayUserMessage(messageData);
    window.chatbot.actions.sendMessage(messageData);
    setTimeout(function(){
      jQuery("#inbenta-bot-input").attr('data-value','');
      jQuery("#inbenta-bot-input").val('');
      jQuery("#inbenta-bot-input").attr('placeholder', 'Ask here');
    }, 500);
  });
  chatbot.api.addVariable('acme_airlines_en/Name', 'John Doe');
});

var audio = document.querySelector('audio');

function captureMicrophone(callback) {
    btnReleaseMicrophone.disabled = false;
    if(microphone) {
        callback(microphone);
        return;
    }
    if(typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
        alert('This browser does not supports WebRTC getUserMedia API.');

        if(!!navigator.getUserMedia) {
            alert('This browser seems supporting deprecated getUserMedia API.');
        }
    }
    navigator.mediaDevices.getUserMedia({
        audio: isEdge ? true : {
            echoCancellation: false
        }
    }).then(function(mic) {
        callback(mic);
    }).catch(function(error) {
        alert('Unable to capture your microphone. Please check console logs.');
        console.error(error);
    });
}

function replaceAudio(src) {
    var newAudio = document.createElement('audio');
    newAudio.controls = true;

    if(src) {
        newAudio.src = src;
    }

    var parentNode = audio.parentNode;
    parentNode.innerHTML = '';
    parentNode.appendChild(newAudio);

    audio = newAudio;
}

function stopRecordingCallback() {
    replaceAudio(URL.createObjectURL(recorder.getBlob()));

    btnStartRecording.disabled = false;

    setTimeout(function() {
        if(!audio.paused) return;

        setTimeout(function() {
            if(!audio.paused) return;
        }, 1000);

    }, 300);

    btnDownloadRecording.disabled = false;

    if(isSafari) {
        click(btnReleaseMicrophone);
        setTimeout(function(){
          touch(btnStartRecording);
        },2000);
    }

    if(!recorder || !recorder.getBlob()) return;

    var blob = recorder.getBlob();

    var data = new FormData();
    var oReq = new XMLHttpRequest();

    $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('visibleCol').addClass('hiddenCol');
    $('.allLoader').removeClass('hiddenCol').addClass('visibleCol');

    oReq.open("POST", 'https://kosmo.sevn.pro/encodeLatest', true);
    oReq.onload = function (oEvent) {
      // Uploaded.
      var xhr = new XMLHttpRequest();
      // console.log('ee',oEvent);
      console.log('res',JSON.parse(this.responseText) );
      var resp = JSON.parse(this.responseText) ;
      xhr.open('GET', resp.file, true);
      // xhr.open('GET', 'https://kosmo.sevn.pro/track.flac', true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function(e) {
        if (this.status == 200) {
          var myBlob = this.response;
          console.log(new Blob([new Uint8Array(myBlob)]));
          window.sendASRRequest(new Blob([new Uint8Array(myBlob)]));
        }
      };
      xhr.send();
    };
    data.append('file', blob);
    oReq.send(data);
}

var recorder; // globally accessible
var microphone;

var btnStartRecording = document.getElementById('microphone-button-taphold');
var btnStopRecording = document.getElementById('btn-stop-recording');
var btnReleaseMicrophone = document.querySelector('#btn-release-microphone');
var btnDownloadRecording = document.getElementById('btn-download-recording');

btnStartRecording.ontouchstart = function() {
    if (!microphone) {
        captureMicrophone(function(mic) {
            microphone = mic;

            if(isSafari) {
                replaceAudio();

                audio.muted = true;
                setSrcObject(microphone, audio);
                window.flag = true;
                return;
            }
            touch(btnStartRecording);
            if($(window).width()>768){
              var event = $.Event( "touchstart" );
              $(btnStartRecording).trigger(event);
            }
        });
        return;
    }
    if(!isEdge){
      $('#microphone-button-taphold').addClass('holded');
    }else{
      $('#microphone-button-taphold').addClass('holded-edge');
    }
    $('.loader-wrapp>img').addClass('visibleLoader');
    $('.loader-wrapp>span').removeClass('visibleText');
    $('#timer').text('');
    mSeconds = 0;
    window.timerInterval = setInterval(function(){mSeconds+=10; $('#timer').text(`${mSeconds/1000} s`)},10);
    isRecording = true;
    
    replaceAudio();

    audio.muted = true;
    setSrcObject(microphone, audio);

    var options = {
        type: 'audio',
        numberOfAudioChannels: isEdge ? 1 : 2,
        checkForInactiveTracks: true,
        bufferSize: 16384
    };

    if(navigator.platform && navigator.platform.toString().toLowerCase().indexOf('win') === -1) {
        options.sampleRate = 48000; // or 44100 or remove this line for default
        if(isEdge){
          options.sampleRate = 44100;
        }
    }

    if(recorder) {
        recorder.destroy();
        recorder = null;
    }

    recorder = RecordRTC(microphone, options);

    recorder.startRecording();

    btnStopRecording.disabled = false;
    btnDownloadRecording.disabled = true;
};

btnStartRecording.ontouchend = function() {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
  if($(window).width()>768){
     $('#microphone-button-taphold').removeClass('holded');
    if(isEdge){
      $('#microphone-button-taphold').removeClass('holded-edge');
    }
    $('.loader-wrapp>img').removeClass('visibleLoader');
    $('.loader-wrapp>span').addClass('visibleText');
    clearInterval(window.timerInterval);
  }
};

// btnStopRecording.onclick = function() {
//     this.disabled = true;
//     recorder.stopRecording(stopRecordingCallback);
// };

btnReleaseMicrophone.onclick = function() {
    this.disabled = true;
    btnStartRecording.disabled = false;

    if(microphone) {
        microphone.stop();
        microphone = null;
    }
};

btnDownloadRecording.onclick = function() {
    this.disabled = true;
    if(!recorder || !recorder.getBlob()) return;
    var blob = recorder.getBlob();
    var data = new FormData();
    var oReq = new XMLHttpRequest();
    oReq.open("POST", 'https://kosmo.sevn.pro/encode', true);
    oReq.onload = function (oEvent) {
      // Uploaded.
      var xhr = new XMLHttpRequest();
      console.log(oEvent);
      xhr.open('GET', 'https://kosmo.sevn.pro/track.flac', true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function(e) {
        if (this.status == 200) {
          var myBlob = this.response;
          console.log(new Blob([new Uint8Array(myBlob)]));
          window.sendASRRequest(new Blob([new Uint8Array(myBlob)]));
        }
      };
      xhr.send();
    };
    data.append('file', blob);
    oReq.send(data);
};
jQuery(document).ready(function(){
  if(window.isFirefox) {
    jQuery('.microphone-button-taphold').css('margin-top', '-70%');
  }
  if(!isSafari) {
    touch(btnStartRecording);
  }
});
window.sendASRRequest = function(blob) {
    function ajaxSuccess() {
      var result = this.responseText;
      console.log("AJAXSubmit - Success!"); //DEBUG
      try {
        result = JSON.parse(result);
        $('#timer').text('');
        $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('hiddenCol').addClass('visibleCol');
        $('.allLoader').removeClass('visibleCol').addClass('hiddenCol');
        // jQuery('body').append(result.results[0].alternatives[0].transcript);
        if(result.results && result.results.length>0){
          jQuery("#inbenta-bot-input").val(result.results[0].alternatives[0].transcript);
          jQuery("#inbenta-bot-input").attr('data-value', result.results[0].alternatives[0].transcript);
        }else{
          jQuery("#inbenta-bot-input").val("");
          jQuery("#inbenta-bot-input").attr('data-value', "");
        }
      } catch (exc) {
        console.warn('Could not parse result into JSON object: "' + result + '"');
      }
    }
    var data;
    var sample_rate = window.samplerate;
    var language = window.language;
    var key = window._google_api_key;
    var alternatives = window._asr_alternatives;
    // use FileReader to convert Blob to base64 encoded data-URL
    var reader = new window.FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
    //only use base64-encoded data, i.e. remove meta-data from beginning:
    // var audioData = reader.result.replace(/^data:audio\/flac;base64,/,'');
    if(window.isFirefox) {
      var audioData = reader.result.replace(/^data:application\/octet-stream;base64,/,'');
    }
    else {
      var audioData = reader.result.replace(/^data:;base64,/,'');
    }
      data = {
          config: {
          encoding: "FLAC",
          sampleRateHertz: 48000,
          languageCode: 'en-US',
          maxAlternatives: alternatives
        },
        audio: {
          content: audioData
        }
      };
      if(isEdge){
        data.config.sampleRateHertz = 44100;
      }
      var oAjaxReq = new XMLHttpRequest();
      oAjaxReq.onload = ajaxSuccess;

      if(!window.auth){
        window.auth = 'serviceKey';
      } else if(window.auth !== 'apiKey'){
        console.error('unknown authentification method: ', window.auth);
      }
      //test
      key = 'AIzaSyA-jabza2otTKehPlI0QG0k6C5Gf1RczFE';
      window.auth = 'apiKey';
      var params = window.auth === 'apiKey'?  '?key='+key : (window.auth === 'serviceKey'? '?access_token='+key : '');
      console.log(params);
      oAjaxReq.open("post", "https://speech.googleapis.com/v1/speech:recognize"+params, true);
      oAjaxReq.setRequestHeader("Content-Type", "application/json");
      oAjaxReq.send(JSON.stringify(data));
    };
  };

function click(el) {
    el.disabled = false; // make sure that element is not disabled
    var evt = document.createEvent('Event');
    evt.initEvent('click', true, true);
    el.dispatchEvent(evt);
}

function touch(el) {
    el.disabled = false; // make sure that element is not disabled
    var evt = document.createEvent('Event');
    evt.initEvent('touchstart', true, true);
    el.dispatchEvent(evt);
}
