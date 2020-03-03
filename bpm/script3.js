function createBuffers(url) {

  // Fetch Audio Track via AJAX with URL
  request = new XMLHttpRequest();
 
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
 
  request.onload = function(ajaxResponseBuffer) {
 
     // Create and Save Original Buffer Audio Context in 'originalBuffer'
     var audioCtx = new AudioContext();
     var songLength = ajaxResponseBuffer.total;
    
 
     // Arguments: Channels, Length, Sample Rate
     var offlineCtx = new OfflineAudioContext(1, songLength, 44100);
     source = offlineCtx.createBufferSource();
     var audioData = request.response;
     audioCtx.decodeAudioData(audioData, function(buffer) {
 
          window.originalBuffer = buffer.getChannelData(0);
          var source = offlineCtx.createBufferSource();
          source.buffer = buffer;
 
          // Create a Low Pass Filter to Isolate Low End Beat
          var filter = offlineCtx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.value = 140;
          source.connect(filter);
          filter.connect(offlineCtx.destination);

          source.start(0);

 
             // Render this low pass filter data to new Audio Context and Save in 'lowPassBuffer'
             offlineCtx.startRendering().then(function(lowPassAudioBuffer) {
 
              var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
              var song = audioCtx.createBufferSource();
              song.buffer = lowPassAudioBuffer;
              song.connect(audioCtx.destination);
 
              // Save lowPassBuffer in Global Array
              window.lowPassBuffer = song.buffer.getChannelData(0);
              console.log("Low Pass Buffer Rendered!");
              lowPassBuffer = getSampleClip(lowPassBuffer, 150);
              lowPassBuffer = normalizeArray(lowPassBuffer);
              console.log(lowPassBuffer)
              lowPassBuffer = lowPassBuffer.filter(function (value) {
                return !Number.isNaN(value);
            });
              console.log(Math.min(...lowPassBuffer))
              console.log(Math.max(...lowPassBuffer))
              console.log(lowPassBuffer.reduce((a,b) => a + b) / lowPassBuffer.length)
             });
 
         },
         function(e) {});
  }
  request.send();
 }
 
 function getSampleClip(data, samples) {

  var newArray = [];
  var modulus_coefficient = Math.round(data.length / samples);

  for (var i = 0; i < data.length; i++) {
     if (i % modulus_coefficient == 0) {
         newArray.push(data[i]);
     }
  }
  return newArray;
}


function normalizeArray(data) {

  var newArray = [];

  for (var i = 0; i < data.length; i++) {
      newArray.push(Math.abs(Math.round((data[i + 1] - data[i]) * 1000)));
  }

  return newArray;
}



createBuffers('http://127.0.0.1:5500/eddy.mp3');

