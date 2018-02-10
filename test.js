const ffmpeg = require('ffmpeg-win');
function done(err) {
  if (err) throw err;
  console.log('ok, done');
}

ffmpeg.wav('./public/audioUploads/uploadFile-1518141022079.mp3', './x.wav', done);
