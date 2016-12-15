var app = angular.module('SocialZoo', ['ngRoute','angular-jwt']);

app.run(function($rootScope, $location, $window, authentificationFactory) {
  console.log($rootScope.isLoggedIn);
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    //$rootScope.isLoggedIn = authentificationFactory.isLoggedIn ? authentificationFactory.isLoggedIn : false;
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !authentificationFactory.isLoggedIn) {
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
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller : 'RegisterController',
      controllerAs : 'vm',
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
