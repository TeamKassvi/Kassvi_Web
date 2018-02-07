const mongoose = require('mongoose');
const Emotion = mongoose.model('Emotion');

exports.getAnalyser = (req,res) =>{
  res.render('analyser');
};
