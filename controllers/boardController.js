var mongoose = require('mongoose');
var Review = mongoose.model('Review');

module.exports.getAllMessages = function(req, res){
  Review
    .find()
    .exec(function(err, message){
      if (err){
        console.log('Impossible de récupérer les messages');
        res
          .status(500)
          .json(err);
      } else {
      res
        .json(message);
      }
   });
};
module.exports.addOneMessage = function(req, res){
  Review
    .create({
      message : req.body.message
    }, function(err, message){
      if (err){
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(201)
          .json(message);
      }
    });
};

module.exports.getOneMessage = function(req, res){
  var id = req.params.reviewId;

  Review
    .findById(id)
    .exec(function(err, doc){
      var response = {
        status : 200,
        message : doc
      };
      if (err){
        response.status = 500;
        response.message = err;
      } else if(!doc){
        response.status = 404;
        response.message = {
          "message" : "Message ID not found" + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });
};

module.exports.updateMessage = function(req, res){
  var id = req.params.reviewId;

  Review
    .findById(id)
    .select('-comments')
    .exec(function(err, review){
      if(err){
        res
          .status(500)
          .json(err);
          return;
      } else if (!review){
        res
          .status(404)
          .lson({
            "message" : "Review ID not found" +reviewId
          });
          return;
      }
      review.message = req.body.message,
      review.comments = req.body.comments

      review
        .save(function(err, reviewUpdated){
          if(err){
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });
    });
}

module.exports.deleteMessage = function(req, res){
  var id = req.params.reviewId;

  Review
    .findById(id)
    .remove()
    .exec(function(err){
      if(err){
        res.send(err);
      } else {
        res.json({message : 'Deleted'});
      }
    });
}

var _addComment = function(req, res, review){
  review.comments.push({
    message : req.body.message
  });


  review.save(function(err, updateReview){
    if (err){
      res
        .status(500)
        .json(err);
    } else {
      res
        .status(200)
        .json(updateReview.comments[updateReview.comments.length - 1]);
    }
  });
};

module.exports.commentAddOne = function(req, res){
  var id = req.params.reviewId;
  Review
    .findById(id)
    .select('comments')
    .exec(function(err, review){
      var response = {
        status : 200,
        message : review
      };
      if (err) {
        console.log("Error finding review");
        response.status = 500;
        response.message = {
          "message" : "Review ID not found" + reviewId
        };
      }
      if (review) {
        _addComment(req, res, review);
      } else {
        res
          .status(response.status)
          .json(response.message);
      }
    });
};
