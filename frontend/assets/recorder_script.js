jQuery(document).ready(function(){
  setTimeout(function(){
    jQuery('<button ng-click="startRecording();" style="cursor: pointer; border: none; background: #fff" id="microphone-button" class="microphone-button"><i class="fa fa-microphone" style="color: #6ac1ca; font-size: 18px;"></i></button>').insertBefore( ".inbenta-bot-button" );
    jQuery('<button ng-click="stopRecording();" style="display: none; cursor: pointer; border: none; background: #fff" class="microphone-button-slash" id="microphone-button-slash"><i class="fa fa-microphone-slash" style="color: #6ac1ca; font-size: 18px;"></i></button>').insertBefore( ".inbenta-bot-button" );
  },3000);
});
