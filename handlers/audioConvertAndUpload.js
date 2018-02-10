exports.wavConvert=function(reqfilename, filename){
  //reqfilename - dsngfsalk.mp3
  //filename - lfnwf
const ffmpeg = require('ffmpeg-win');
function done(err) {
  if (err) throw err;
  console.log('ok, done');
}
console.log(filename);
ffmpeg.wav(`public/audioUploads/${reqfilename}`, `public/audioUploads/${filename}.wav`, done);
};
