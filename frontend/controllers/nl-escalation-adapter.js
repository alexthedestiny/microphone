/**
 * This adapter creator export an adapter which hides the conversation window when the user types end in the query.
 */
function getSessionID(url) {
 return fetch(url, {
   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
   credentials: 'same-origin', // include, same-origin, *omit
   method: 'GET', // *GET, POST, PUT, DELETE, etc.
   mode: 'cors', // no-cors, cors, *same-origin
 })
 .then(response => response.json()); // parses response to JSON
}

function getChasitorInit(url, data) {
  return fetch(url, {
    credentials: 'same-origin',
    cache: 'no-cache',
    body: JSON.stringify({
      "buttonId": "5731r000000kBrT",
      "buttonOverrides": [
      ],
      "deploymentId": "5721r000000kBJG",
      "screenResolution": "1366x768",
      "isPost": false,
      "language": "ru-RU",
      "organizationId": "00D1r000000qoGS",
      "prechatDetails": [
      ],
      "prechatEntities": [
      ],
      "receiveQueueUpdates": true,
      "sessionId": data.id,
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36",
      "visitorName": ""
    }),
    credentials: 'same-origin',
    headers: {
      "X-LIVEAGENT-SESSION-KEY": data.key,
      "X-LIVEAGENT-AFFINITY": data.affinityToken,
      "X-LIVEAGENT-SEQUENCE": "1",
    },
    method: 'POST',
    mode: 'cors',
  })
  .then(response => response.json()); // parses response to JSON
}

function getUsersMessages(url, data) {
  var settingsMessage = {
    "async": false,
    "crossDomain": true,
    "url": url,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "X-LIVEAGENT-SESSION-KEY": data.key,
      "X-LIVEAGENT-AFFINITY": data.affinityToken,
    },
    "statusCode": {
        "204": function() {
        },
        "200": function() {
        }
    },
    "success": function(data) {
    }
  }
  return $.ajax(settingsMessage);
}

function sendUsersMessages(url, data, dataMessage) {
  var settingsSendMessage = {
    "async": false,
    "crossDomain": true,
    "url": url,
    "method": "POST",
    "data": {
      "text": dataMessage
    },
    "headers": {
      "X-LIVEAGENT-SESSION-KEY": data.key,
      "X-LIVEAGENT-AFFINITY": data.affinityToken,
      "X-LIVEAGENT-SEQUENCE": window.SEQUENCE
    }
  }
  return $.ajax(settingsSendMessage);
}

function getConversationHistory() {
  var conversationHistoryConfig = {
    "crossDomain": true,
    "url": window.apis + '/v1/conversation/history',
    "method": "GET",
    "headers": {
      "x-inbenta-key": "qhgFlQl5PuOW2NB+31ZDFX4fE7ABYFifd0K5tm0S4Fw=",
      "authorization": window.InbentaAuth,
      "x-inbenta-session": "Bearer " + window.InbentaSessionToken
    }
  }
  return $.ajax(conversationHistoryConfig);
}

function launchNLEsclationForm(escalateNLForm,rejectedEscalation,noAgentsAvailable,MaxNoResults) {
  var initMaxResults=3;
  var systemMessageEscalationID = "";
  var setEscalations=true;
  var noResults=1;
  var escalateSystemMessageData={
    message: 'escalate-chat',
    translate: true,
    options: [
        {label: 'yes',value:'yes'},
        {label: 'no', value:'no'}
      ]
  }
  if(typeof MaxNoResults == "undefined"){
    MaxNoResults = initMaxResults;
  }
  if(typeof escalateNLForm=='string' && escalateNLForm!==''){
    var sendEscalateForm={
      message:escalateNLForm
    }
  }else console.error("escalateNLForm must be a not emtpy string", escalateNLForm);
  if(!validateEscalateConditions(rejectedEscalation) || !validateEscalateConditions(noAgentsAvailable)) {
    setEscalations=false
  }

  return function(chatBot){
    chatBot.subscriptions.onSendMessage(function(messageData, next) {
      if(window.sessionData && window.intervalIsClear) {
        window.SEQUENCE++;
        sendUsersMessages('https://sfla.nextlevel.ai/Chasitor/ChatMessage', window.sessionData, messageData.message).done(function (response) {
          // window.SEQUENCE++;
        });
        // setInterval(function(){
        //   window.intAck++;
        //   getUsersMessages('https://sfla.nextlevel.ai/System/Messages?ack='+window.intAck, window.sessionData).done(function (response) {
        //     for(var i = 0; i < response.messages.length; i++) {
        //       if(response.messages[i].type == "ChatEstablished") {
        //         chatBot.actions.displayChatbotMessage({type:'answer',message: "Your agent is " + response.messages[i].message.name});
        //         return;
        //       }
        //       if(response.messages[i].type == "ChatMessage") {
        //         chatBot.actions.displayChatbotMessage({type:'answer',message: response.messages[i].message.text});
        //       }
        //     }
        //   });
        // },15000);
      }
      else {
        return next(messageData);
      }
    });
    /**
     * Check for escalate and no-results flags, and display a SystemMessage offering escalation.
     * @param  {[Object]}   messageData [The current MessageData to be displayed]
     * @param  {Function} next        [Callback]
     * @return {[next]}               [next]
     */
    chatBot.subscriptions.onDisplayChatbotMessage(function(messageData, next) {
      if(typeof messageData.flags!=="undefined" && setEscalations) {
        if (messageData.flags.length>0) {
            if(messageData.flags.indexOf('escalate')!==-1){
              systemMessageEscalationID = chatBot.actions.displaySystemMessage(escalateSystemMessageData);
              return
            }else if(messageData.flags.indexOf('no-results')!==-1){
              if(noResults >= MaxNoResults){
                systemMessageEscalationID = chatBot.actions.displaySystemMessage(escalateSystemMessageData);
                return
              }else {
                noResults++;
              }
            }
        }else {
          noResults=1;
        }
      }
      return next(messageData);

    });
    /**
     * Subscription to DisplayAgentResponse, to check if the user wants to escalate
     * Check ID to be sure it's our agentMessage and the option selected
     * @param  {[Object]}   optionData [Option selected]
     * @param  {Function} next       [Next callback to be returned]
     */
    chatBot.subscriptions.onSelectSystemMessageOption(function(optionData, next) {
      if (optionData.id !== systemMessageEscalationID) {
          return next(optionData);
      }else{
        if (optionData.option.value == "yes") {
          getConversationHistory();
          getSessionID('https://sfla.nextlevel.ai/System/SessionId')
            .then(data => { jQuery.get("https://d.la1-c2-frf.salesforceliveagent.com/chat/rest/Visitor/Settings.jsonp?chatted=1&sid="+data.id+"&Settings.prefix=Visitor&Settings.buttonIds=[5731r000000kBrT]&Settings.urlPrefix=undefined&callback=liveagent._.handlePing&deployment_id=5721r000000kBJG&org_id=00D1r000000qoGS&version=42").then(data=>{
              if(JSON.parse(data.match(/\{.+\}/g)).messages[0].message.buttons[0].isAvailable) {
                getSessionID('https://sfla.nextlevel.ai/System/SessionId')
                 .then(data => {
                   window.sessionData = data;
                   window.SEQUENCE = 1;
                   window.intAck = -1;
                   window.pc = -1;
                   window.showed = false;
                   window.intervalIsClear = false;
                   var myMessages = [];
                   var settings = {
                     "async": false,
                     "crossDomain": true,
                     "url": "https://sfla.nextlevel.ai/Chasitor/ChasitorInit",
                     "method": "POST",
                     "headers": {
                       "Content-Type": "application/json",
                       "X-LIVEAGENT-SESSION-KEY": data.key,
                       "X-LIVEAGENT-AFFINITY": data.affinityToken,
                       "X-LIVEAGENT-SEQUENCE": window.SEQUENCE,
                       "Cache-Control": "no-cache",
                     },
                     "processData": false,
                     "data": JSON.stringify({
                       "buttonId": "5731r000000kBrT",
                       "buttonOverrides": [
                       ],
                       "deploymentId": "5721r000000kBJG",
                       "screenResolution": "1366x768",
                       "isPost": false,
                       "language": "ru-RU",
                       "organizationId": "00D1r000000qoGS",
                       "prechatDetails": [
                       ],
                       "prechatEntities": [
                       ],
                       "receiveQueueUpdates": true,
                       "sessionId": data.id,
                       "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36",
                       "visitorName": ""
                     })
                   }
                   $.ajax(settings).done(function (response) {
                     // chatBot.actions.sendMessage(sendEscalateForm);
                     chatBot.actions.displayChatbotMessage({type:'answer',message: "Ok, hold on please. We sent request to agent"});
                     if(window.sessionData) {
                       var refreshIntervalId = setInterval(function(){
                         window.pc++;
                         window.intervalIsClear = true;
                         getUsersMessages('https://sfla.nextlevel.ai/System/Messages?ack='+window.intAck+'&pc='+window.pc, window.sessionData).done(function(response) {
                           if(response.messages.length) {
                             window.intAck++;
                             for(var i = 0; i < response.messages.length; i++) {
                               if(!window.showed) {
                                 if(response.messages[i].type == "ChatEstablished") {
                                   chatBot.actions.displayChatbotMessage({type:'answer',message: "Your agent is " + response.messages[i].message.name});
                                   window.showed = true;
                                 }
                               }
                               if(response.messages[i].type == "ChatMessage") {
                                 if(myMessages.indexOf(response.messages[i].message.text) == -1) {
                                   myMessages.push(response.messages[i].message.text);
                                   chatBot.actions.displayChatbotMessage({type:'answer',message: myMessages[myMessages.length - 1]});
                                 }
                               }
                               if(response.messages[i].type == "ChatEnded") {
                                 chatBot.actions.displayChatbotMessage({type:'answer',message: "Chat ended by agent. Thanks for your request."});
                                 clearInterval(refreshIntervalId);
                                 window.intervalIsClear = false;
                                 return;
                               }
                             }
                           }
                         });
                       },6000);
                     }

                   });
                 });
              }
              else {
                chatBot.actions.displayChatbotMessage({type:'answer',message: "No one agent is available"});
                // console.log('not passed');
              }
              // else {
              //   if (result.hasOwnProperty('reason')) {
              //     if(typeof result.reason=='string'){
              //       chatBot.actions.displayChatbotMessage({type:'answer',message:result.reason});
              //       return
              //     }
              //   }
              //   if(noAgentsAvailable.action == "intentMatch"){
              //     chatBot.actions.sendMessage({message:noAgentsAvailable.value});
              //   }else if (noAgentsAvailable.action == "displayChatbotMessage"){
              //     chatBot.actions.displayChatbotMessage({type:'answer',message:noAgentsAvailable.value});
              //   }
              //   return
              // }
            });
          })
        }
        else{
          if (rejectedEscalation.action =='intentMatch') {
            chatBot.actions.sendMessage({message:rejectedEscalation.value});
          }else if (rejectedEscalation.action =='displayChatbotMessage'){
            chatBot.actions.displayChatbotMessage({type:'answer',message:rejectedEscalation.value});
          }

        }
      }
    });
 }
}

/**
 * Validate the escalateConditions in order to reject if it hasn't been properly set.
 * @param  {[Object]} evaluatedObject Object escalateCondition to be evaluated
 * @return {[Boolean]}                 [boolean to check if it has bene correctly set]
 */
function validateEscalateConditions(evaluatedObject){
  if(typeof evaluatedObject == 'object'){
    if (evaluatedObject.hasOwnProperty('action') && evaluatedObject.hasOwnProperty('value')) {
      return true;
    }else{
    console.error('Escalate conditions must have action and value parameters.');
    return false;
    }
  }else {
    console.error('Escalate conditions must be an object');
    return false;
  }
}

window.launchNLEsclationForm = launchNLEsclationForm;
