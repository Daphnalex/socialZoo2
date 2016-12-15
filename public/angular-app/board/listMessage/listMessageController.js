angular.module("SocialZoo").controller("listMessageCtrl",listMessageCtrl);


function listMessageCtrl($location, $route, $scope, $routeParams, reviewFactory, $window, jwtHelper){
  var lm = this;
  lm.reviews = null;
  reviewFactory.getAllMessages().then(function(response){
    console.log(response);
    lm.reviews = response.data;
  });

  lm.pop = function(){
    angular.element('#modalComment').css("display", "block");
  }
  lm.fermeture = function(){
    angular.element('#modalComment').remove();
    $route.reload();
  }


  lm.addComment = function(){
    var id = $routeParams.id;
    console.log('id : '+id );
    var token = jwtHelper.decodeToken($window.sessionStorage.token);
    var username = token.username;
    console.log(username);
    var postData = {
      nameZoo : username,
      message : lm.message
    };

    if(lm.formComment.$valid){

    }


  }

}
