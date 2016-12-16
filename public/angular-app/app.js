var app = angular.module('SocialZoo', ['ngRoute','angular-jwt','firebase']);

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

app.config(['$httpProvider','$routeProvider', function($httpProvider,$routeProvider, $scope, $location, $rootScope){

  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/authentification', {
      templateUrl: 'angular-app/authentification/login.html',
      controller : "loginController",
      controllerAs : 'lc',
      access : {
        restricted : false
      }
    }).
    when('/logout', {
      templateUrl: 'angular-app/register/register.html',
      controller : function($scope){
        $rootScope.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/authentification');
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
    .when('/chat', {
      templateUrl: 'angular-app/partials/chat/chat.html',
      controller : 'chatController',
      access : {
        restricted : false
      }
    })
    .when('/home', {
      templateUrl: 'angular-app/board/listMessage/listMessage.html',
      controller : 'listMessageCtrl',
      controllerAs : 'lm',
      access: {
        restricted : true
      }
    })
    .when('/zoo', {
      templateUrl: 'angular-app/board/listMessage/listMessageMe.html',
      controller : 'listMessageCtrl',
      controllerAs : 'lm',
      access: {
        restricted : true
      }
    })
    .otherwise({
      redirectTo : '/home'
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
