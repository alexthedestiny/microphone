var isFirefox = window.isFirefox = typeof InstallTrigger !== 'undefined';
window.isFocus = false;
var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isExplorer = false;
var holdTime = 0;
var holdInterval;


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
    });
  }, 2000);
}

if(!isSafari && $(window).width()<768){
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
    });
  }, 2000);
}

if(isSafari && $(window).width()<768) {
  setTimeout(function() {
    jQuery('#microphone-button-taphold').trigger('touchstart');
  }, 1000);
}
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }
$(function(){
    //custom textarea start
    $(document).on('keydown', '#custom-input', function(e){
      if( (e.keyCode == 13 || e.keyCode == 10) && !(e.ctrlKey || e.metaKey)){
        e.preventDefault();
        window.customData = jQuery("#custom-input").val();
        let messageData = {
          message: window.customData
        }
        if(window.customData && window.customData.length>0){
          window.chatbot.actions.displayUserMessage(messageData);
          window.chatbot.actions.sendMessage(messageData);
          setTimeout(function(){
            $('#custom-input').val('');
            auto_grow(document.getElementById('custom-input'));
          }, 0);
        }
      }
      if ( (e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10 )){
        document.getElementById('custom-input').value += "\r\n";
      }
    });
     //custom textarea end
    //start custom input
    $(document).on('click', '#custom-send', function(){
      window.customData = jQuery("#custom-input").val();
      let messageData = {
        message: window.customData
      }
      if(window.customData && window.customData.length>0){
        window.chatbot.actions.displayUserMessage(messageData);
        window.chatbot.actions.sendMessage(messageData);
        setTimeout(function(){
          $('#custom-input').val('');
          auto_grow(document.getElementById('custom-input'));
        }, 0);
      }
    });
    // end custom input
  var recorderEnable = false;

  if( $(window).width()>768 ){
    $('#microphone-button-taphold').mousedown(function(){
      var event = $.Event( "touchstart" );
      if(!recorderEnable){
        $(btnStartRecording).trigger(event);
        recorderEnable = true;
        holdTime = 0;
        clearInterval(holdInterval);
        holdInterval = setInterval(function(){
          holdTime += 500;
        }, 500);
      }
    });
    $('#microphone-button-taphold').mouseup(function(){
      if(recorderEnable){
        recorderEnable = false;
        var event = $.Event( "touchend" );
        $(btnStartRecording).trigger(event);        
      }
    });
    $('#microphone-button-taphold').mouseleave(function(){
      if(recorderEnable){
        recorderEnable = false;
        var event = $.Event( "touchend" );
        $(btnStartRecording).trigger(event);
      }
    });
  }
});

var mSeconds = 0;
var isRecording = false;
window.counter = 0
function getVisitorSetting(url) {
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', url, true);
  xhr2.onload = function(e) {
    if (this.status == 200) {
      console.log('e',e);
    }
  };
  xhr2.send();
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
 
  $(document).keypress(function(e) {
    if(e.which == 13) {
      if(window.isFocus) {
        jQuery("#inbenta-bot-input").attr('data-value','');
      }
    }

  document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1 && isSafari) { event.preventDefault(); }
  }, false);

});
  chatbot.api.addVariable('acme_airlines_en/Name', 'John Doe');
});

var audio = document.querySelector('audio');

function captureMicrophone(callback) {
    if(microphone) {
        callback(microphone);
        return;
    }
    if(typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
        // alert('This browser does not supports WebRTC getUserMedia API.');
        isExplorer = true;
        console.log('sorry, you are using ie');
        setTimeout(function(){
          if(FWRecorder && !FWRecorder.isMicrophoneAccessible()){
            FWRecorder.record('audio', 'audio.wav');
          }else{
            FWRecorder.record('audio', 'audio.wav');
            if(!isEdge){
              $('#microphone-button-taphold').addClass('holded');
            }else{
              $('#microphone-button-taphold').addClass('holded-edge');
            }

            $('.loader-wrapp>img').addClass('visibleLoader');
            $('.loader-wrapp>span').removeClass('visibleText');
            $('#timer').text('');
            mSeconds = 0;
            window.timerInterval = setInterval(function(){mSeconds+=100; $('#timer').text(String(mSeconds/1000)+' s' )},100);
            isRecording = true;
          }
        },0);
        return;
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
    if(isSafari && holdTime>=500) {
      click(btnReleaseMicrophone);
      setTimeout(function(){
        touch(btnStartRecording);
      },0);
    }

    if(!recorder || !recorder.getBlob()) return;

    var blob = recorder.getBlob();

    var data = new FormData();
    var oReq = new XMLHttpRequest();
    console.log('stop callback');
    $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('visibleCol').addClass('hiddenCol');
    $('.allLoader').removeClass('hiddenCol').addClass('visibleCol');
    if(holdTime<500){
      console.log(holdTime);
      clearInterval(holdInterval);
      $('#timer').text('');
      $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('hiddenCol').addClass('visibleCol');
      $('.allLoader').removeClass('visibleCol').addClass('hiddenCol');
      return;
    }
    oReq.open("POST", 'https://kosmo.sevn.pro/encodeLatest', true);
    oReq.onload = function (oEvent) {
      // Uploaded.
      console.log('uploaded');
      var xhr = new XMLHttpRequest();
      console.log('res',JSON.parse(this.responseText) );
      var resp = JSON.parse(this.responseText) ;
      window.responseFromEncode = resp; 
      xhr.open('GET', resp.file, true);
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
function stopRecordingCallbackExplorer() {
  var recBlob = FWRecorder.getBlob('audio');
    console.log('holdTime',holdTime);
    var data = new FormData();
    var oReq = new XMLHttpRequest();
    console.log('stop callback ie');
    $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('visibleCol').addClass('hiddenCol');
    $('.allLoader').removeClass('hiddenCol').addClass('visibleCol');
    if(holdTime<1500){
      clearInterval(holdInterval);
      $('#timer').text('');
      $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('hiddenCol').addClass('visibleCol');
      $('.allLoader').removeClass('visibleCol').addClass('hiddenCol');
      return;
    }
    else {
      oReq.open("POST", 'https://kosmo.sevn.pro/encodeLatest', true);
    oReq.onload = function (oEvent) {
      // Uploaded.
      console.log('uploaded');
      var xhr = new XMLHttpRequest();
      console.log('res',JSON );
      console.log('oEvent',oEvent);
      var resp = JSON.parse(this.responseText) ;
      window.responseFromEncode = resp;
      xhr.open('GET', resp.file, true);
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
    data.append('file', recBlob);
    oReq.send(data);
    }
}

var recorder; // globally accessible
var microphone;

var btnStartRecording = document.getElementById('microphone-button-taphold');
var btnStopRecording = document.getElementById('btn-stop-recording');
var btnReleaseMicrophone = document.querySelector('#btn-release-microphone');

btnStartRecording.ontouchstart = function() {
  console.log('before addclass 1');
  if(!isRecording){ 
    if (!microphone || (isExplorer && !FWRecorder.isMicrophoneAccessible() ) ) {
        captureMicrophone(function(mic) {
            microphone = mic;
            if(isSafari && $(window).width()<768 ) {
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
    window.timerInterval = setInterval(function(){mSeconds+=100; $('#timer').text(String(mSeconds/1000)+' s' )},100);
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
        // options.sampleRate = ( isEdge ) ? 44100 : 48000; // or 44100 or remove this line for default
        options.sampleRate = 48000;
    }
    if(recorder) {
        recorder.destroy();
        recorder = null;
    }
    if(!isExplorer){
      recorder = RecordRTC(microphone, options);
      recorder.startRecording();
    }
    else{
      FWRecorder.record('audio', 'audio.wav');
    }
    holdTime = 0;
    clearInterval(holdInterval);
    holdInterval = setInterval(function(){
      holdTime += 500;
    },500);
  }
};

btnStartRecording.ontouchend = function() {
    console.log('end isExplorer: ', isExplorer);
    isRecording = false;
    if(!isExplorer){
      recorder.stopRecording(stopRecordingCallback);
    }else{
      FWRecorder.stopRecording('audio');
      setTimeout(function(){
        stopRecordingCallbackExplorer();
      }, 500);
    }
    $('#microphone-button-taphold').removeClass('holded');
    if(isEdge){
      $('#microphone-button-taphold').removeClass('holded-edge');
    }
    $('.loader-wrapp>img').removeClass('visibleLoader');
    $('.loader-wrapp>span').addClass('visibleText');
    clearInterval(window.timerInterval);
};

btnReleaseMicrophone.onclick = function() {
    if(microphone) {
        microphone.stop();
        microphone = null;
    }
};

jQuery(document).ready(function(){
  if(window.isFirefox) {
    jQuery('.microphone-button-taphold').css('margin-top', '-70%');
    $('.details').css('display','none');
  }
});
window.sendASRRequest = function(blob) {
    function ajaxSuccess() {
      var result = this.responseText;
      try {
        result = JSON.parse(result);
        $('#timer').text('');
        $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('hiddenCol').addClass('visibleCol');
        $('.allLoader').removeClass('visibleCol').addClass('hiddenCol');
        if(result.results && result.results.length>0){
          document.getElementById('inbenta-bot-input').setAttribute("value", result.results[0].alternatives[0].transcript);
          jQuery("#inbenta-bot-input").val(result.results[0].alternatives[0].transcript);
          jQuery("#inbenta-bot-input").attr('data-value', result.results[0].alternatives[0].transcript);
          $('#custom-input').val(result.results[0].alternatives[0].transcript);
          auto_grow(document.getElementById('custom-input'));
          if(window.responseFromEncode){
            var params = {
              text: result.results[0].alternatives[0].transcript,
              flac: window.responseFromEncode.flac,
              wav: window.responseFromEncode.wav,
              time: window.responseFromEncode.time
            };
            $.post("/log", params,
              function(data){
                console.log('done');
              }
            );
          }
        }else{
          $('#custom-input').val('');
          auto_grow(document.getElementById('custom-input'));
          jQuery("#inbenta-bot-input").val("");
          jQuery("#inbenta-bot-input").attr('data-value', "");
          document.getElementById('inbenta-bot-input').setAttribute("value", "");
          if(window.responseFromEncode){
            var params = {
              text: " ",
              flac: window.responseFromEncode.flac,
              wav: window.responseFromEncode.wav,
              time: window.responseFromEncode.time
            };
            $.post("/log", params,
              function(data){
                console.log('done');
              }
            );
          }
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
      // if(isEdge){
      //   data.config.sampleRateHertz = 44100;
      // }
      var oAjaxReq = new XMLHttpRequest();
      oAjaxReq.onload = ajaxSuccess;

      if(!window.auth){
        window.auth = 'serviceKey';
      } else if(window.auth !== 'apiKey'){
        // console.error('unknown authentification method: ', window.auth);
      }
      //test
      key = 'AIzaSyA-jabza2otTKehPlI0QG0k6C5Gf1RczFE';
      window.auth = 'apiKey';
      var params = window.auth === 'apiKey'?  '?key='+key : (window.auth === 'serviceKey'? '?access_token='+key : '');
      oAjaxReq.open("post", "https://speech.googleapis.com/v1/speech:recognize"+params, true);
      oAjaxReq.setRequestHeader("Content-Type", "application/json");
      oAjaxReq.send(JSON.stringify(data));
    };
  };

function click(el) {
    var evt = document.createEvent('Event');
    evt.initEvent('click', true, true);
    el.dispatchEvent(evt);
}

function touch(el) {
    var evt = document.createEvent('Event');
    evt.initEvent('touchstart', true, true);
    el.dispatchEvent(evt);
}
