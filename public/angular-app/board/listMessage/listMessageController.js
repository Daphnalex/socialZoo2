angular.module("SocialZoo").controller("listMessageCtrl",listMessageCtrl);


function listMessageCtrl($location, $route, $scope, $routeParams, reviewFactory, $window, jwtHelper){
    var lm = this;
    lm.reviews = null;

    var token = $window.sessionStorage.token;
    var decodedToken = jwtHelper.decodeToken(token);
    console.log(decodedToken);
    $scope.loggedInUser = decodedToken.nameZoo;



    reviewFactory.getAllMessages().then(function(response){
      console.log('la réponse : '+response);
      lm.reviews = response.data;

      lm.getOne = function(review){
        angular.element('#modalComment').css('display','block');
        console.log('la donnée est '+review);
        var id = review._id;
        reviewFactory.getOneMessage(id).then(function(response){
          console.log(id);
          lm.addComment = function(review){
            review.author = decodedToken.nameZoo;
            reviewFactory.commentAddOne(id, review).then(function(response){
              lm.review = response;
            });
            angular.element('#modalComment').remove();
            $route.reload();
          };
        });
      };
    })


    lm.addMessage = function(){
      var postData = {
        message : lm.message,
        author : decodedToken.nameZoo
      };
      console.log(postData);

      if(lm.blocForm.$valid){
        reviewFactory.addOneMessage(postData).then(function(response){
          console.log(response.data);
          if(response.status ===201){
            console.log('ici');
            $route.reload();
          }
        }).catch(function(error){
          console.log(error);
        });
      }
    };



}
