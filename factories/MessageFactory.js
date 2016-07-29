app.factory('messages', function($q, $http, firebaseUrl){

	let getMessageList = function(){
		let messages = [];
    return $q(function(resolve, reject) {
      $http.get(`${firebaseUrl}/message.json`)
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

	let postMessage = function(userMessage){
		return $q(function(resolve, reject) {
      $http.post(`${firebaseUrl}/message.json`, userMessage)
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
			key = url.substring(index, url.length - 1);
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
			key = url.substring(1, url.length - 2);
			console.log("whoa", key)
		}
		if(key === url){
			console.log("it matches")
		}
		return key
  }
	return {getMessageList, postMessage, youtubeChecker, mediaChecker, filterText}
})