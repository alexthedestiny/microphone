function startrecord() {
  startUserMedia();
}

function startUserMedia() {
  recorder = new Recorder(microfonesource);
  recorder && recorder.record();
}

function stoprecord() {
  recorder && recorder.stop();
  // alert(‘Stopped recording.’);
  recorder && recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);
    var li = document.createElement("li");
    var au = document.createElement("audio");
    var hf = document.createElement("a");
    au.controls = true;
    au.src = url;
    hf.href = url;
    hf.download = new Date().toISOString() + ".wav";
    hf.innerHTML = hf.download;
    li.appendChild(au);
    li.appendChild(hf);
    recordingslist.appendChild(li);
  });
}
