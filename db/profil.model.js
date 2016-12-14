var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  review : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now;
  }
});


var Profil = new mongoose.Schema({
  couverture : String,
  imageProfil : String,
  message : [messageSchema]
});


mongoose.model('Profil', Profil);
