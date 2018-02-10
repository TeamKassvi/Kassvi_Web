const mongoose = require('mongoose');
const Emotion = mongoose.model('Emotion');
const multer = require('multer');
// const request = require('request');
const path = require('path');
const ffmpeg = require('ffmpeg-win');
// const Extractor = require("html-extractor");
// const rp = require('request-promise').defaults({simple:false});
var fs = require('fs');
const Ffmpeg = require('./test');




const multerOptions = {
  storage: multer.diskStorage({
    destination: function(req,file,callback){
      callback(null, './public/audioUploads');
    },
    filename:function(req,file,callback){
      // console.log(file);
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  }),
  fileFilter(req, file, next) {
    const isAudio = file.mimetype.startsWith('audio/');
    if(isAudio) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};

exports.uploadFile = multer(multerOptions).single('uploadFile');


exports.getAnalyser = (req,res) =>{
  res.render('analyser');
};

exports.uploadFileSubmit = (req,res) =>{

if(!req.file)
  {
    next();
    return;
  }
  console.log(req.file);
  Ffmpeg.wavConvert();
//correct above

// function done(err) {
//   if (err) throw err;
//   console.log('ok, done');
// }
//
// const tempName = req.file.filename.split('.');
// const wavName = tempName[0];
// console.log(wavName);

// console.log(wavName[0]);

// ffmpeg.wav(`./${req.file.path}`, `./audioUploads/${wavName}.wav`, done);


};
