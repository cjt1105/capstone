app.controller("MessagesCtrl", function($scope, localStorageService, messages){
	let currentUser = localStorageService.get("currentUser");
	$scope.userMessage = null;
	$scope.messageList = [];

	messages.getMessageList()
	.then(function(messages){
		for(message in messages){
			let current = messages[message];
			$scope.messageList.push(current)
		}
	});

  $(document).ready(function() {
    $("#userInput").emojioneArea();
  });

  var el = $("#userInput").emojioneArea();

  $scope.getIframeSrc = function (videoId) {
  return 'https://www.youtube.com/embed/' + videoId;
}

  el[0].emojioneArea.on("keyup", function(editor, event) {
		if(event.which === 13){
			let name = currentUser.displayName;
			let text = el[0].emojioneArea.getText();
			let youtubeKey = messages.youtubeChecker(text);
			let mediaSource =	messages.mediaChecker(text);
			let uid = currentUser.uid;
			let filteredText = messages.filterText(text);
			filteredText = filteredText.join(" ");
			let profilePicture = currentUser.photoURL;
			let newMessage = {
				userName: name,
				text: filteredText,
				userPicture: profilePicture,
				uid: uid,
				isMedia: false,
				isYoutube: false
			}
			editor[0].innerText = "";
			if (youtubeKey!= null){
				newMessage.youtubeKey = youtubeKey;
				newMessage.isYoutube = true;

			}
			if(mediaSource!= null){
				newMessage.mediaSource = mediaSource;
				newMessage.isMedia = true;
			}
			console.log(newMessage);
			messages.postMessage(newMessage)
			.then(function(){
				$scope.messageList = []
				messages.getMessageList().then(function(messages){
					for(message in messages){
					let current = messages[message];
					$scope.messageList.push(current);
					console.log("messages", current.youtubeKey)
					}
				})
			})
		}
  });
})