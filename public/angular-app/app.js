var app = angular.module('SocialZoo', ['ngRoute','angular-jwt']);

app.run(function($rootScope, $location, $window, usersFactory) {
  console.log($rootScope.isLoggedIn);
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    //$rootScope.isLoggedIn = usersFactory.isLoggedIn ? usersFactory.isLoggedIn : false;
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !usersFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/authentification');
    }
  });
});

app.config(['$httpProvider','$routeProvider', function($httpProvider,$routeProvider){

  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/authentification', {
      templateUrl: 'angular-app/authentification/login.html',
      controller : "loginController",
      controllerAs : 'lc',
      access : {
        restricted : false
      }
    })
    .when('/', {
      templateUrl: 'angular-app/board/visualisation-board/visualisation-board.html',
      controller : 'visualisationBoardCtrl',
      controllerAs : 'vb',
      access: {
        restricted : true
      }
    })
    .otherwise({
      redirectTo : '/'
    });
}]);

app.directive('header', function(){
  return {
    restrict : 'A',
    templateUrl: "/angular-app/partials/common/header.html"
  }
});

app.directive('footer', function(){
  return {
    restrict : 'A',
    templateUrl: "/angular-app/partials/common/footer.html"
  }
});
