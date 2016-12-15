angular.module('SocialZoo').controller("chatController", chatController);

function chatController($scope, $firebase, jwtHelper,$window) {
  var ref = new Firebase("https://socialzoo-38f84.firebaseio.com");

  $scope.messages = $firebase(ref);
  var token = $window.sessionStorage.token;
  var decodedToken = jwtHelper.decodeToken(token);
  console.log(decodedToken);
  $scope.loggedInUser = decodedToken.nameZoo;
  $scope.addMessage = function(e) {
          if (e.keyCode != 13) return;
          $scope.messages.$add({from: $scope.loggedInUser, body: $scope.msg});
          $scope.msg = "";
   }
}
