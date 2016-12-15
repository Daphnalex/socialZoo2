angular.module('SocialZoo').factory('reviewFactory', reviewFactory);

function reviewFactory($http){
  return {
    getAllMessages : getAllMessages,
    addOneMessage : addOneMessage,
    getOneMessage : getOneMessage,
    updateMessage : updateMessage,
    deleteMessage : deleteMessage,
    commentAddOne : commentAddOne,
    commentGetAll : commentGetAll,
    commentGetOne : commentGetOne,
    updateComment : updateComment,
    commentDeleteOne : commentDeleteOne
  };

  function getAllMessages() {
	   return $http.get("/api/messages").then(complete).catch(error);
   }
   function addOneMessage(message) {
 	   return $http.post("/api/messages", message).then(complete).catch(error);
    }
    function getOneMessage(reviewId) {
  	   return $http.get("/api/messages/"+reviewId).then(complete).catch(error);
    }
    function updateMessage(reviewId, review){
	      return $http.put('/api/messages/'+ reviewId, review).then(complete).catch(error);
    }
    function deleteMessage(reviewId) {
    	return $http.delete('/api/messages/' +reviewId).then(complete).catch(error);
    }
    function commentAddOne(reviewId, comment){
    	return $http.post('/api/messages/'+reviewId+'/comments', comment).then(complete).catch(error);
    }
    function commentGetAll(reviewId){
    	return $http.get('/api/messages/'+reviewId+'/comments').then(complete).catch(error);
    }
    function commentGetOne(reviewId, commentId){
    	return $http.get('/api/messages/'+reviewId+'/comments/'+commentId).then(complete).catch(error);
    }
    function updateComment(reviewId, commentId, comment){
    	return $http.put('/api/messages/'+reviewId+'/comments/'+commentId, comment).then(complete).catch(error);
    }
    function commentDeleteOne(reviewId, commentId){
    	return $http.delete('/api/messages/'+reviewId+'/comments/'+commentId).then(complete).catch(error);
    }
    function complete(response) {
    	return response;
    }

    function error(err) {
    	return err;
    }

}
