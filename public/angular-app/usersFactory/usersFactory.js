angular.module('SocialZoo').factory("usersFactory", usersFactory);

function usersFactory($http) {
	return {
		userGetAll : userGetAll,
		userAddOne : userAddOne,
		userGetOne : userGetOne,
    userDelete : userDelete,
    userUpdate : userUpdate
	};

function userGetAll() {
	return $http.get("/api/users").then(complete).catch(error);
}

function userAddOne(postData) {
	return $http.post("/api/users/add", postData).then(complete).catch(error);
}

function userDelete(id) {
	return $http.delete('/api/users/' +id).then(complete).catch(error);
}

function userGetOne(id) {
	return $http.get('/api/users/' +id).then(complete).catch(error);
}

function userUpdate(id, user) {
	return $http.put('/api/users/update/' +id, user).then(complete).catch(error);
}

function complete(response) {
	return response;
}

function error(err) {
	return err;
}
