angular.module('SocialZoo').factory('authentificationFactory', authentificationFactory);

function authentificationFactory() {
  return {
    auth: auth
  };

  var auth = {
    isLoggedIn: false
  };
}
