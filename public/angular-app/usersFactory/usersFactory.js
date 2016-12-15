angular.module('SocialZoo').factory("usersFactory", usersFactory);

function usersFactory($http){
  return {
    userAddOne : userAddOne
  };

    function userAddOne(user){
      console.log('Test : ' +user);
      return $http.post('/api/users/register', user).then(complete).catch(error);
    }
    function complete(response) {
    	return response;
    }

    function error(err) {
    	return err;
    }
}
