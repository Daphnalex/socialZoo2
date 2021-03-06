var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function(req, res){
  console.log('registering user');
  var nameZoo = req.body.nameZoo;
  var password = req.body.password;
  var avatar = req.body.avatar;
  var image = req.body.image;

User.create({
  nameZoo : nameZoo,
  password : bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  avatar : avatar,
  image : image
}, function(err, user){
  if(err){
    console.log(err);
    res.status(400).json(err);
  } else {
    console.log('user created', user);
    res.status(201).json(user);
  }
});

};

module.exports.login = function(req, res){
  console.log('logging in user');
  var nameZoo = req.body.nameZoo;
  var password = req.body.password;

  User.findOne({
    nameZoo : nameZoo
  }).exec(function(err, user){
    if(err){
      console.log(err);
      res.status(400).json(err);
    } else {
      if (bcrypt.compareSync(password, user.password)){
        console.log('User found', user);
        var token = jwt.sign({ nameZoo : user.nameZoo }, 's3cr3t', { expiresIn : 3600 });
        res.status(200).json({success : true, token : token});
      } else {
        res.status(401).json('Unauthorized');
      }

    }
  });
};

module.exports.authentificate = function (req, res, next){
  var headerExists = req.headers.authorization;
  if(headerExists){
    var token = req.header.authorization.split(' ')[1];
    jwt.verify(token, 's3cr3t', function(error, decoded){
      if(error){
        console.log(error);
        res.status(401).json('Unauthorized');
      } else {
        req.user = decoded.nameZoo;
        next();
      }
    })
  } else {
    res.status(403).json('No token provided');
  }
};

module.exports.getAllUsers = function(req, res) {

	User
	  .find() // prend tout
	  .exec(function(err, user) {
	  	if(err) {
	  		console.log("Impossible de récupérer les utilisateurs");
	  		res
	  		  .status(500)
	  		  .json(err);
	  	} else {
	  		res
	  		  .json(user);
	  	}
	  });
};
