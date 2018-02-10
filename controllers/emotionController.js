const mongoose = require('mongoose');
const Emotion = mongoose.model('Emotion');
const multer = require('multer');
const path = require('path');
var fs = require('fs');
const audioConvertAndUpload = require('../handlers/audioConvertAndUpload');

exports.getAnalyser = (req,res) =>{
  res.render('analyser');
};

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
};  //multer options

exports.uploadFile = multer(multerOptions).single('uploadFile'); //file upload

exports.uploadFileSubmit = (req,res) =>{

if(!req.file)
  {
    next();
    return;
  }
  var tempName=req.file.filename.split('.');
  var filename = tempName[0];
  // console.log(req.file);
  console.log(req.file.filename);
  audioConvertAndUpload.wavConvert(req.file.filename, filename);
  res.redirect('/analyser');
};
