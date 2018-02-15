const WaveRecorder = require('wave-recorder');
var recorder = WaveRecorder({
  channels:"1",
  bitDepth:"16",
  silenceDuration:"5"
});

navigator.webkitPersistentStorage.requestQuota(1024*1024, function(grantedBytes) {
  window.webkitRequestFileSystem(PERSISTENT, grantedBytes, onInit)
})

function onInit(fileSystem){
  var fs = WebFS(fileSystem.root)
  var audioContext = new AudioContext()

  navigator.webkitGetUserMedia({audio:true}, function(stream) {

    // get the mic input
    var audioInput = audioContext.createMediaStreamSource(stream)

    // create the recorder instance
    var recorder = WaveRecorder(audioContext, {
      channels: 2,
      bitDepth: 32
    })

    audioInput.connect(recorder.input)

    var filePath = 'test.wav'
    var fileStream = fs.createWriteStream(filePath)
    recorder.pipe(fileStream)

    // // optionally go back and rewrite header with updated length
    // recorder.on('header', function(header){
    //   var headerStream = fs.createWriteStream(path, {
    //     start: 0,
    //     flags: 'r+'
    //   })
    //
    //   headerStream.write(header)
    //   headerStream.end()
    // })

    // record for 10 seconds then stop
    setTimeout(function(){
      recorder.end()
    }, 10000)
  })
}
