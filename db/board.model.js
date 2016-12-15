var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  message : String,
  author : String,
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var reviewSchema = new mongoose.Schema({
  message : {
    type : String,
    required : true
  },
  author : {
    type : String,
    required : true
  },
  comments : [commentSchema],
  createdOn : {
    type : Date,
    required : true,
    "default" : Date.now
  }
});

var Board = new mongoose.Schema({
  imageBoard : String,
  avatar : String,
  reviews : [reviewSchema]
});

mongoose.model('Board', Board);
