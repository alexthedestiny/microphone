jQuery(document).ready(function(){
	$(document).on('click', '.inbenta-bot__launcher', ()=>{
		setTimeout(()=>{
			jQuery('<div onclick="startRecording();" style="cursor: pointer; border: none; background: #fff" id="microphone-button" class="microphone-button"><i class="fa fa-microphone" style="color: #6ac1ca; font-size: 18px;"></i></div>').insertBefore( ".inbenta-bot__chat__footer .inbenta-bot-button" );
    		jQuery('<div onclick="stopRecording();" style="display: none; cursor: pointer; border: none; background: #fff" class="microphone-button-slash" id="microphone-button-slash"><i class="fa fa-microphone-slash" style="color: #6ac1ca; font-size: 18px;"></i></div>').insertBefore( ".inbenta-bot__chat__footer .inbenta-bot-button" );
		},500);
	} );
});
