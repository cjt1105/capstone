app.factory('conversations', function($q,$http,firebaseUrl){

	createKey = function(uid1,uid2){
		let uids = [uid1,uid2];
		uids = uids.sort();
		uids = uids.join("");
		return uids
	}
	createConvo = function(key, data){
		return $q(function(resolve, reject) {
      $http.put(`${firebaseUrl}/conversations/${key}/info.json`, data)
      .success(function(conversation) {
        resolve(conversation)
      })
      .error(function(error) {
        reject(error);
      })
    });
	}

	getConvoList = function(){
    let conversationsList = [];
		return $q(function(resolve, reject) {
      $http.get(`${firebaseUrl}/conversations.json`)
      .success(function(conversations) {
      	Object.keys(conversations).forEach(function(key) {
          conversationsList.push(conversations[key]);
        });
        resolve(conversationsList)
      })
      .error(function(error) {
        reject(error);
      })
    });
	}

	getMessages = function(key){
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

    let deleteMessage = function(channel,message){
    return $q(function(resolve, reject) {
      $http.delete(`${firebaseUrl}/conversations/${channel}/messages/${message}.json`)
      .success(function(messages) {
        console.log("what", `${firebaseUrl}/channels/${channel}/messages/${message}.json`)
        resolve(messages)
      })
      .error(function(error) {
        reject(error);
      })
    });
  };

  let addId = function(channel,message, data){
    return $q(function(resolve, reject) {
      $http.patch(`${firebaseUrl}/conversations/${channel}/messages/${message}.json`, data)
      .success(function(messages) {
        console.log("what", `${firebaseUrl}/channels/${channel}/messages/${message}.json`)
        resolve(messages)
      })
      .error(function(error) {
        reject(error);
      })
    });
  };

	return {addId, deleteMessage, createConvo, createKey, getMessages, getConvoList, postMessage}
})