var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  nameZoo : {
    type : String,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  avatar : {
    type : String,
    "default" : "http://zoodeparis.fr/thumbs/zoo-animalerie-paris.jpg"
  },
  image : {
    type : String,
    "default" : "http://t3.gstatic.com/images?q=tbn:ANd9GcRzVx_Gr1hlGWEguqeQGEcLT4s351VjsqDAmWRzJIdekV4i1rsVo8WL0Mo"
  }
});
mongoose.model('User', userSchema);
