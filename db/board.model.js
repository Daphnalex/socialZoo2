var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  nameZoo : String,
  avatar : String,
  image : String
});

var commentSchema = new mongoose.Schema({
  message : String,
  author : userSchema,
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var Review = new mongoose.Schema({
  message : {
    type : String,
    required : true
  },
  author : userSchema,
  comments : [commentSchema],
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var Board = new mongoose.Schema({
  reviews : [Review]
});

mongoose.model('Board', Board);
mongoose.model('Review', Review);
