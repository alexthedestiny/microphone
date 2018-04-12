// jQuery('.click_and_hold').on('mousedown', function() {
//   btnStartRecordingClick();
// }).on('mouseup mouseleave', function() {
//     btnStopRecordingClick();
//     btnDownloadRecording();
// });

var isFirefox = window.isFirefox = typeof InstallTrigger !== 'undefined';
window.isFocus = false;
// $(function(){
//   $( "#microphone-button-taphold" ).bind( "taphold", tapholdHandler );

//   function tapholdHandler( event ){
//     // $( event.target ).addClass( "taphold" );
//     console.log('holded');
//   }
// });
// $('#microphone-button-taphold').click(function(){
//   console.log('click done');
// });
var countOfTouch = 0;

$(function(){
  if( $(window).width()>768 ){
    var recorderEnable = false;
    $('#microphone-button-taphold').mousedown(function(){
      console.log('down');
      // micHoldDown();
      // click(btnStartRecording);
      var event = $.Event( "touchstart" );
      $(btnStartRecording).trigger(event);
      recorderEnable = true;
    });
    $('#microphone-button-taphold').mouseup(function(){
      console.log('up');
      // micHoldUp();
      // click(btnStopRecording);
      if(recorderEnable){
        recorderEnable = false;
        var event = $.Event( "touchend" );
        $(btnStartRecording).trigger(event);
      }
    });
    $('#microphone-button-taphold').mouseleave(function(){
      console.log('up');
      // micHoldUp();
      if(recorderEnable){
        recorderEnable = false;
        var event = $.Event( "touchend" );
        $(btnStartRecording).trigger(event);
      }
      // click(btnStopRecording);
    });
  }
  else {
    // document.getElementById('microphone-button-taphold').addEventListener('touchstart', function(event) {
    //     // micHoldDown();
    //     countOfTouch++;
    //     $('.header__title').text("c: "+countOfTouch);
    //     // if(countOfTouch>2){
          
    //     // }
      
    // }, false);
    document.getElementById('microphone-button-taphold').addEventListener('touchend', function(event) {
        micHoldUp();
    }, false);
  }
});

var timerInterval;
var mSeconds = 0;
var audioStart;
var audioStop;
if(!isSafari){
  audioStart = new Audio('./assets/audio/beep.wav');
  audioStop = new Audio('./assets/audio/stop.wav');
  console.log(audioStop);
}

var isRecording = false;
window.counter = 0
var isClicked = false;
function micHoldDown(){
  isClicked = true;
  if(!isRecording){
    setTimeout(function(){
      if(isSafari) {
        window.counter++;
        if(window.counter == 1) {
          touch(btnStartRecording);
          return;
        }
      }
      // jQuery('#btn-start-recording').click();
      touch(btnStartRecording);
      var count = 0;
      var myInt = setInterval(function() {
        count++;
        if(window.flag) {
          document.getElementById("btn-start-recording").click();
          window.flag = false;
          clearInterval(myInt);
        }
      }, 200);
      if(!isSafari){
        // audioStop = new Audio('./assets/audio/stop.wav');
        // console.log(audioStop);
        // audioStop.pause();
        // audioStop.currentTime = 0;
        // audioStart.play();
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
    }, 0);
  }
}
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
    if(!isSafari){
      // audioStart = new Audio('./assets/audio/beep.wav');
      // audioStart.pause();
      // audioStart.currentTime = 0;
      // audioStop.play();
    }
    // jQuery('#btn-stop-recording').click();
    click(btnStopRecording);
    // $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('visibleCol').addClass('hiddenCol');
  }
}


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
  chatbot.actions.showConversationWindow();
  setTimeout(function(){
    jQuery('.ui-draggable').attr('style', 'bottom: 120px; right: 15px; position: relative;');
  },0);
  // jQuery('<div ng-click="startRecording();" style="cursor: pointer; border: none; background: #fff" id="microphone-button" class="microphone-button"><i class="fa fa-microphone" style="color: #6ac1ca; font-size: 18px;"></i></div>').insertBefore( ".inbenta-bot-button" );
  // jQuery('<div ng-click="stopRecording();" style="display: none; cursor: pointer; border: none; background: #fff" class="microphone-button-slash" id="microphone-button-slash"><i class="fa fa-microphone-slash" style="color: #6ac1ca; font-size: 18px;"></i></div>').insertBefore( ".inbenta-bot-button" );
  window.neededToShow = true;
  // document.getElementById('microphone-button').addEventListener('click', function() {
  //   window.startRecording();
  // });
  // jQuery('<div style="cursor: pointer; border: none; background: #fff" id="microphone-button-taphold" class="microphone-button-taphold"><i class="fa fa-microphone"></i></div>').insertBefore( ".inbenta-bot-button" );
  $("#inbenta-bot-input").focus(function(){
    window.isFocus = true;
    setTimeout(function(){
      var attr = jQuery("#inbenta-bot-input").attr('data-value');
      console.log(attr);
      // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
      if (typeof attr !== typeof undefined && attr !== false) {
        jQuery("#inbenta-bot-input").val(jQuery("#inbenta-bot-input").attr('data-value'));
      }
    },0);
  });
  $("#inbenta-bot-input").blur(function(){
    window.isFocus = false;
    setTimeout(function(){
      var attr = jQuery("#inbenta-bot-input").attr('data-value');
      console.log(attr);
      // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
      if (typeof attr !== typeof undefined && attr !== false) {
        jQuery("#inbenta-bot-input").val(jQuery("#inbenta-bot-input").attr('data-value'));
      }
    },0);
  });
  $("#inbenta-bot-input").keyup(function(e){
    setTimeout(function(){
      // console.log(e);
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

          // jQuery("#inbenta-bot-input").attr('data-value','');
          // jQuery('.inbenta-bot-button').trigget('click', [$("#inbenta-bot-input").val()]);
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
            // audio.play();
        }, 1000);

        // audio.play();
    }, 300);

    // audio.play();

    btnDownloadRecording.disabled = false;

    if(isSafari) {
        click(btnReleaseMicrophone);
        setTimeout(function(){
          touch(btnStartRecording);
        },2000);
    }

    if(!recorder || !recorder.getBlob()) return;

    // if(isSafari) {
    //     recorder.getDataURL(function(dataURL) {
    //         SaveToDisk(dataURL, getFileName('mp3'));
    //     });
    //     return;
    // }

    var blob = recorder.getBlob();
    // var file = new File([blob], getFileName('mp3'), {
    //     type: 'audio/wav'
    // });

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
          // window.audio_context.close();
          // window.audio_context = {};
          // myBlob is now the blob that the object URL pointed to.
        }
      };
      xhr.send();
    };
    data.append('file', blob);
    oReq.send(data);
    // invokeSaveAsDialog(file);
}

var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if(isSafari) {
  setTimeout(function() {
    jQuery('#microphone-button-taphold').trigger('touchstart');
  }, 1000);
}

var recorder; // globally accessible
var microphone;

var btnStartRecording = document.getElementById('microphone-button-taphold');
// var btnStartRecording = document.getElementById('btn-start-recording');
var btnStopRecording = document.getElementById('btn-stop-recording');
var btnReleaseMicrophone = document.querySelector('#btn-release-microphone');
var btnDownloadRecording = document.getElementById('btn-download-recording');

btnStartRecording.ontouchstart = function() {
    this.disabled = true;
    this.style.border = '';
    this.style.fontSize = '';

    if (!microphone) {
        captureMicrophone(function(mic) {
            microphone = mic;

            if(isSafari) {
                replaceAudio();

                audio.muted = true;
                setSrcObject(microphone, audio);
                // audio.play();

                // btnStartRecording.disabled = false;
                // btnStartRecording.style.border = '1px solid red';
                // btnStartRecording.style.fontSize = '150%';
                window.flag = true;
                
                // alert('Please click startRecording button again. First time we tried to access your microphone. Now we will record it.');
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
    // audio.play();

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

    if(recorder) {
        // click(btnStopRecording);
    }
};

btnDownloadRecording.onclick = function() {
    this.disabled = true;
    if(!recorder || !recorder.getBlob()) return;

    // if(isSafari) {
    //     recorder.getDataURL(function(dataURL) {
    //         SaveToDisk(dataURL, getFileName('mp3'));
    //     });
    //     return;
    // }

    var blob = recorder.getBlob();
    // var file = new File([blob], getFileName('mp3'), {
    //     type: 'audio/wav'
    // });
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
          // window.audio_context.close();
          // window.audio_context = {};
          // myBlob is now the blob that the object URL pointed to.
        }
      };
      xhr.send();
    };
    data.append('file', blob);
    oReq.send(data);
    // invokeSaveAsDialog(file);
};
jQuery(document).ready(function(){
  if(window.isFirefox) {
    jQuery('.microphone-button-taphold').css('margin-top', '-70%');
  }
  if(!isSafari) {
    touch(btnStartRecording);
  }
  // if(isEdge) {
  //   $('.mic-wrapper, .timer-wrap, .loader-wrapp, .allLoader').css('display', 'block');
  //   setTimeout(function(){
  //     $('.mic-wrapper, .timer-wrap, .loader-wrapp, .allLoader').css('display', 'flex');
  //     $('.allLoader').css('position', 'absolute');
  //   },1000);
  // }
});
window.sendASRRequest = function(blob) {
    function ajaxSuccess() {
      if(this.status !== '200' || this.status !== 200) {
        // jQuery('#microphone-button').html('<i class="fa fa-microphone" style="color: #6ac1ca; font-size: 18px;"></i>');
      }
      var result = this.responseText;
      console.log('result no parse',result);
      console.log("AJAXSubmit - Success!"); //DEBUG
      try {
        result = JSON.parse(result);
        console.log('result parsed',result);
        $('#timer').text('');
        $('.mic-wrapper, .timer-wrap, .loader-wrapp').removeClass('hiddenCol').addClass('visibleCol');
        // if(isEdge) {
        //   $('.mic-wrapper, .timer-wrap, .loader-wrapp, .allLoader').css('display', 'block');
        //   setTimeout(function(){
        //     $('.mic-wrapper, .timer-wrap, .loader-wrapp, .allLoader').css('display', 'flex');
        //   },1000);
        // }
        $('.allLoader').removeClass('visibleCol').addClass('hiddenCol');
        // jQuery('body').append(result.results[0].alternatives[0].transcript);
        if(result.results && result.results.length>0){
          jQuery("#inbenta-bot-input").val(result.results[0].alternatives[0].transcript);
          jQuery("#inbenta-bot-input").attr('data-value', result.results[0].alternatives[0].transcript);
        }else{
          jQuery("#inbenta-bot-input").val("");
          jQuery("#inbenta-bot-input").attr('data-value', "");
        }
      
        // jQuery("#inbenta-bot-input").val(result.results[0].alternatives[0].transcript);
        // jQuery("#inbenta-bot-input").attr('value', result.results[0].alternatives[0].transcript);
        // jQuery('#microphone-button').html('<i class="fa fa-microphone" style="color: #6ac1ca; font-size: 18px;"></i>');
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
      //NOTE: instead of API, it is recommended to use service API authentification,
      //      then create an access_token (on your server, retrieve it with the client)
      //    and set the token as access_token param
      //      ?access_token=<access_token>
      //
      //      or set it in the header as
      //          Authorization: Bearer <access_token>
      //
      //      (see example code below)

      if(!window.auth){
        window.auth = 'serviceKey';
      } else if(window.auth !== 'apiKey'){
        console.error('unknown authentification method: ', window.auth);
      }
      //test
      key = 'AIzaSyA-jabza2otTKehPlI0QG0k6C5Gf1RczFE';
      window.auth = 'apiKey';
      var params = window.auth === 'apiKey'?  '?key='+key : (window.auth === 'serviceKey'? '?access_token='+key : '');
      //DISABLED: currently Google Cloud Speech does not support authorization (headers) in combination with CORS
//        if(window.auth === 'serviceKey'){
//          oAjaxReq.setRequestHeader("Authorization", "Bearer "+key);
//          oAjaxReq.withCredentials = true;
//        }
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

function getRandomString() {
    if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
        var a = window.crypto.getRandomValues(new Uint32Array(3)),
            token = '';
        for (var i = 0, l = a.length; i < l; i++) {
            token += a[i].toString(36);
        }
        return token;
    } else {
        return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
    }
}

function getFileName(fileExtension) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    return 'RecordRTC-' + year + month + date + '-' + getRandomString() + '.' + fileExtension;
}

function SaveToDisk(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.download = fileName || 'unknown';
        save.style = 'display:none;opacity:0;color:transparent;';
        (document.body || document.documentElement).appendChild(save);

        if (typeof save.click === 'function') {
            save.click();
        } else {
            save.target = '_blank';
            var event = document.createEvent('Event');
            event.initEvent('click', true, true);
            save.dispatchEvent(event);
        }

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE
    else if (!!window.ActiveXObject && document.execCommand) {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}
