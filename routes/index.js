var express = require('express');
var router = express.Router();

ctrlUsers = require('../controllers/usersController.js');

//Authentification

router
  .route('/users/register')
  .post(ctrlUsers.register);

router
  .route('/users/login')
  .post(ctrlUsers.login);

router
  .route('/users')
  .get(ctrlUsers.getAllUsers);

module.exports = router;
