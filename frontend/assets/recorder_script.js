jQuery(document).ready(function(){
  setTimeout(function(){
    jQuery('<div ng-click="startRecording();" style="cursor: pointer; border: none; background: #fff" id="microphone-div" class="microphone-div"><i class="fa fa-microphone" style="color: #6ac1ca; font-size: 18px;"></i></div>').insertBefore( ".inbenta-bot-div" );
    jQuery('<div ng-click="stopRecording();" style="display: none; cursor: pointer; border: none; background: #fff" class="microphone-div-slash" id="microphone-div-slash"><i class="fa fa-microphone-slash" style="color: #6ac1ca; font-size: 18px;"></i></div>').insertBefore( ".inbenta-bot-div" );

    },3000);
});
