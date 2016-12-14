angular.module('SocialZoo').factory('usersFactory', usersFactory);

function usersFactory() {
  return {
    auth: auth
  };

  var auth = {
    isLoggedIn: false
  };
}
