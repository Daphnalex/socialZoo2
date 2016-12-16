angular.module("SocialZoo").controller("listMessageCtrl",listMessageCtrl);


function listMessageCtrl($location, $route, $scope, $routeParams, reviewFactory, $window, jwtHelper){
    var lm = this;
    lm.reviews = null;
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

            reviewFactory.commentAddOne(id, review).then(function(response){
              lm.review = response;
            });
            angular.element('#modalComment').remove();
            $route.reload();
          }
        });


      };


    });

}
