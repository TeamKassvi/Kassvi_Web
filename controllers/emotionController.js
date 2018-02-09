const mongoose = require('mongoose');
const Emotion = mongoose.model('Emotion');
const multer = require('multer');
const request = require('request');
const formidable = require('formidable');
const formData = require('form-data');
const path = require('path');
const Extractor = require("html-extractor");
const rp = require('request-promise').defaults({simple:false});
const sbuff = require('simple-bufferstream')
var fs = require('fs');

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

exports.uploadFileSubmit = async (req,res) =>{

if(!req.file)
  {
    next();
    return;
  }
  console.log(req.file);
  console.log(req.file.path);

var options = { method: 'POST',
  url: 'http://g711.org/submit/',
  headers:
   {
     'Content-Type': 'application/x-www-form-urlencoded',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData:
   { userfile:
      { value: fs.createReadStream(req.file.path), //'fs.createReadStream("D:\\music\\02 Break Up Every Night.mp3")'
        options: { filename: req.file.path,   // 'D:\\music\\02 Break Up Every Night.mp3'
          contentType: null
         } },
     platform: 'asterisk',
     volume: '20',
     bandpass: '1' } };

rp(options)
.then((error, response, body) => {
  if (error) throw new Error(error);

  else {
    console.log(response);

    console.log('body returned ' + body);
  // var myExtractor = new Extractor();

// var html = body;
// myExtractor.extract(html, function(err, data){
//   if(err)
//   throw err;
//   else console.log(data);
// });
}
});

// .catch(error =>{
// });
// });

};
