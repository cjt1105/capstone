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
	}
	return {getMessageList}
})