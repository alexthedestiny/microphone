jQuery(document).ready(function(){
	$(document).on('click', '.inbenta-bot__launcher', ()=>{
		console.log('click');
		setTimeout(()=>{
			jQuery('<button onclick="startRecording();" style="cursor: pointer; border: none; background: #fff" id="microphone-button" class="microphone-button"><i class="fa fa-microphone" style="color: #6ac1ca; font-size: 18px;"></i></button>').insertBefore( ".inbenta-bot-button" );
    		jQuery('<button onclick="stopRecording();" style="display: none; cursor: pointer; border: none; background: #fff" class="microphone-button-slash" id="microphone-button-slash"><i class="fa fa-microphone-slash" style="color: #6ac1ca; font-size: 18px;"></i></button>').insertBefore( ".inbenta-bot-button" );
    		console.log('hmm');
		},2000);
	} );
});
