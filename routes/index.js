var express = require('express');
var router = express.Router();

ctrlUsers = require('../controllers/usersController.js');
ctrlMessages = require('../controllers/boardController.js');
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


router
  .route('/messages')
  .post(ctrlMessages.addOneMessage)
  .get(ctrlMessages.getAllMessages);

router
  .route('/messages/:reviewId')
  .get(ctrlMessages.getOneMessage)
  .put(ctrlUsers.authentificate, ctrlMessages.updateMessage)
  .delete(ctrlUsers.authentificate, ctrlMessages.deleteMessage);

router
  .route('/messages/:reviewId/comments')
  .post(ctrlMessages.commentAddOne)
  .get(ctrlMessages.commentGetAll);

router
  .route('/messages/:reviewId/comments/:commentId')
  .get(ctrlMessages.commentGetOne)
  .put(ctrlUsers.authentificate, ctrlMessages.updateComment)
  .delete(ctrlUsers.authentificate, ctrlMessages.commentDeleteOne);



module.exports = router;
