angular.module('SocialZoo').controller('loginController', loginController);

function loginController($http, $location, $window, authentificationFactory, jwtHelper, $rootScope) {
  var lc = this;

  lc.isLoggedIn = function() {
    if(authentificationFactory.isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  lc.login = function() {
    if(lc.username && lc.password) {
      var user = {
        nameZoo: lc.username,
        password: lc.password
      };

      console.log(user),

      $http.post('/api/users/login', user).then(function(response) {
        if(response.data.success) {
          $window.sessionStorage.token = response.data.token;
          authentificationFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          console.log(decodedToken);
          lc.loggedInUser = decodedToken.nameZoo;
          $rootScope.isLoggedIn = lc.loggedInUser != '' ? true : false;
          $location.path("/home");
        }
      }).catch(function(error) {
        console.log(error);
        angular.element('#messageError').css('display', 'block');
      })
    }
  };



  lc.logout = function() {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/authentification');
  };

  lc.isActiveTab = function(url) {
    var currentPath = $location.path().split('/')[1];
    return (url === currentPath ? 'active' : '');
  };
}
