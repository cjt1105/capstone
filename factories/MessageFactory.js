app.factory('messages', function($q, $http, firebaseUrl){

	let getMessageList = function(key){
		let messages = [];
    return $q(function(resolve, reject) {
      $http.get(`${firebaseUrl}/channels/${key}/messages.json`)
      .success(function(messageArray) {
        if (messageArray) {
        let messageList = messageArray;
        Object.keys(messageList).forEach(function(key) {
          messageList[key].id=key;
          messages.push(messageList[key]);
        });
      }
        resolve(messages)
      })
      .error(function(error) {
        reject(error);
      })
    });
	};

	let addId = function(channel,message, data){
    return $q(function(resolve, reject) {
      $http.patch(`${firebaseUrl}/channels/${channel}/messages/${message}.json`, data)
      .success(function(messages) {
      	console.log("what", `${firebaseUrl}/channels/${channel}/messages/${message}.json`)
        resolve(messages)
      })
      .error(function(error) {
        reject(error);
      })
    });
	};

	let deleteMessage = function(channel,message){
    return $q(function(resolve, reject) {
      $http.delete(`${firebaseUrl}/channels/${channel}/messages/${message}.json`)
      .success(function(messages) {
      	console.log("what", `${firebaseUrl}/channels/${channel}/messages/${message}.json`)
        resolve(messages)
      })
      .error(function(error) {
        reject(error);
      })
    });
	};

	let filterText = function(text){
		textArray = []
		let array = text.split(" ");
		let regex = /\b(?:youtube|.gif|.jpg|.png|.jpeg)\b/gi;
		for(let i=0;i<array.length; i++){
			let current = array[i]
			if(current.match(regex)){
			}
			else {
				textArray.push(current);
			}
		}
		return textArray
	}

	let postMessage = function(userMessage, key){
		return $q(function(resolve, reject) {
      $http.post(`${firebaseUrl}/channels/${key}/messages.json`, userMessage)
      .success(function(messages) {
        resolve(messages)
      })
      .error(function(error) {
        reject(error);
      })
    });
	};

		let youtubeChecker = function(str){
		let key = null;
		let match = false;
		let array = str.split(" ");
		let url = null;
		let regex = /\b(?:youtube)\b/gi;
		for(let i=0;i<array.length; i++){
			let current = array[i]
			if(current.match(regex)){
				url = current;
				match = true;
			}
		}
		if(match === true){
			let index = url.indexOf("=") + 1;
			key = url.substring(index, url.length);
		}
		return key
  };

  let mediaChecker = function(str){
		let key = null;
		let match = false;
		let array = str.split(" ");
		let url = null;
		let regex = /\b(?:.gif|.jpg|.png|.jpeg)\b/gi;
		for(let i=0;i<array.length; i++){
			let current = array[i]
			if(current.match(regex)){
				url = current;
				match = true;
			}
		}
		if(match === true){
			let index = url.indexOf("=") + 1;
			console.log("damnnn", url);
			key = url.substring(1, url.length);
			console.log("whoa", key)
		}
		if(key === url){
			console.log("it matches")
		}
		return key
  }
	return {deleteMessage, addId, getMessageList, postMessage, youtubeChecker, mediaChecker, filterText}
})