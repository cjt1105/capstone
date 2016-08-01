app.factory('conversations', function($q,$http,firebaseUrl){

	createKey = function(uid1,uid2){
		let uids = [uid1,uid2];
		uids = uids.sort();
		uids = uids.join("");
		return uids
	}
	createConvo = function(key, data){
		return $q(function(resolve, reject) {
      $http.post(`${firebaseUrl}/conversations/${key}.json`, data)
      .success(function(conversation) {
        resolve(conversation)
      })
      .error(function(error) {
        reject(error);
      })
    });
	}

	getConvoList = function(){
		return $q(function(resolve, reject) {
      $http.get(`${firebaseUrl}/conversations.json`)
      .success(function(conversations) {
      	conversations = Object.keys(conversations)
        resolve(conversations)
      })
      .error(function(error) {
        reject(error);
      })
    });
	}

	getConvo = function(key){
		return $q(function(resolve, reject) {
      $http.get(`${firebaseUrl}/conversations/${key}/messages.json`)
      .success(function(conversation) {
        resolve(conversation)
      })
      .error(function(error) {
        reject(error);
      })
    });
	}

	postMessage = function(userMessage, key){
		return $q(function(resolve, reject) {
      $http.post(`${firebaseUrl}/conversations/${key}/messages.json`, userMessage)
      .success(function(messages) {
        resolve(messages)
      })
      .error(function(error) {
        reject(error);
      })
    });
	}
	return {createConvo, createKey, getConvo, getConvoList, postMessage}
})