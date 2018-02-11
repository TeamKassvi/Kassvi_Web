const mongoose = require('mongoose');
const Emotion = mongoose.model('Emotion');
const multer = require('multer');
const promisify = require('es6-promisify');
const del = require('delete');
const path = require('path');
var fs = require('fs');
const audioConvertAndUpload = require('../handlers/audioConvertAndUpload');

exports.getAnalyser = (req,res) =>{
  res.render('analyser');
};
exports.getrecordandconvert = (req,res) =>{
  res.render('recordandconvert');
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

exports.uploadFileSubmit = async (req,res) =>{
  if(!req.file)
    {
      next();
      return;
    }  //if file not found, return

  let tempName=req.file.filename.split('.');
  let filename = tempName[0];
  console.log(req.file.filename);
  // const wavConvertPromisify = promisify();
  await audioConvertAndUpload.wavConvert(req.file.filename, filename);
  // await wavConvertPromisify();

  //working fine below
  // async
del([`${req.file.path}`], function(err, deleted) {
  if (err)
    console.log('error');
  // deleted files
  console.log('deleted' + deleted);
});

  // del.promise()
  // .then(function(deleted, err){
  //   if(err)
  //     console.log('error');
  //   console.log('deleted + ' + deleted);
  // });
  // catch(error =>{
  //   console.log('error');
  //   return;
  // });
  res.redirect('/analyser');
};
