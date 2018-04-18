<?php 
 if(!is_dir("uploads/wav")) {
  mkdir("uploads/wav", 0777, true);
}
if(!is_dir("uploads/flac")) {
  mkdir("uploads/flac", 0777, true);
}

function EncodeLatest($file){
    $ffmpeg = FFMpeg\FFMpeg::create();
    $audio = $ffmpeg->open(ROOT.'/'.$file);

    $format = new FFMpeg\Format\Audio\Flac();
    $format
        ->setAudioChannels(1)
        ->setAudioKiloBitrate(256);
    $name = 'track'.time().'.flac';
    $audio->save($format, ROOT.'/uploads/flac/'.$name);
    unlink($file);
            
    return ['file'=>ROOT.'/uploads/flac/'.$name, 'unlinkFile'=>ROOT.'/uploads/flac/'.$name];
}

$file = "uploads/wav/wav-".time().$_FILES['file']['name'].'.wav';

move_uploaded_file($_FILES['file']['tmp_name'], $file);
$encodedResponce = EncodeLatest($file);
echo( json_encode($encodedResponce) );
return true;



?>