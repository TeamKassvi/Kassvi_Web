exports.wavConvert=function(){
const ffmpeg = require('ffmpeg-win');
function done(err) {
  if (err) throw err;
  console.log('ok, done');
}

ffmpeg.wav('public/audioUploads/uploadFile-1518141684641.mp3', './z.wav', done);
};
