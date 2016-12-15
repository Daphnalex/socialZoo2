angular.module("SocialZoo").controller("listMessageCtrl",listMessageCtrl);


function listMessageCtrl(usersFactory, $scope){
  var lm = this;
  lm.users = null;

  // recherche
  $scope.recherche = '';
  // fin recherche

  usersFactory.userGetAll().then(function(response) {
    lm.users = response.data;
  });
}
