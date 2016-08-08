app.controller("MessagesCtrl", function($scope, localStorageService, messages, $routeParams){
	$scope.editMessage = false;
	let key = $routeParams.id;
	let currentUser = localStorageService.get("currentUser");
	$scope.userMessage = null;
	$scope.messageList = [];

	$scope.edit = function(id){
		console.log(id[id])
	}
	$scope.delete = function(id){
		let channelKey = $routeParams.id;
		messages.deleteMessage(channelKey,id)
		.then(function(){
			messages.getMessageList(key)
			.then(function(messages){
				$scope.messageList = [];
				for(message in messages){
					let current = messages[message];
					$scope.messageList.push(current)
				}
			});
		})
	}

	messages.getMessageList(key)
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
	};

  el[0].emojioneArea.on("keyup", function(editor, event) {

		if(event.which === 13){
			let name = currentUser.displayName;
			let text = el[0].emojioneArea.getText();
			console.log(text)
			let youtubeKey = messages.youtubeChecker(text);
			let mediaSource =	messages.mediaChecker(text);
			let uid = currentUser.uid;
			let filteredText = messages.filterText(text);
			filteredText = filteredText.join(" ");
			let profilePicture = currentUser.photoURL;
			let d = new Date()
			let hours = d.getHours();
			let minutes = d.getMinutes();
			let timestamp = null;
			if(hours === 12){
				timestamp = `${hours}:${minutes} PM`
			}
			if(hours > 12){
				hours = hours - 12;
				timestamp = `${hours}:${minutes} PM`
			}
			if(hours < 12){
				timestamp = `${hours}:${minutes} AM`
			}
			let newMessage = {
				userName: name,
				text: filteredText,
				userPicture: profilePicture,
				uid: uid,
				isMedia: false,
				isYoutube: false,
				timestamp: timestamp
			};
			editor[0].innerText = "";
			if (youtubeKey!= null){
				newMessage.youtubeKey = youtubeKey;
				newMessage.isYoutube = true;

			};
			if(mediaSource!= null){
				newMessage.mediaSource = mediaSource;
				newMessage.isMedia = true;
			};
			messages.postMessage(newMessage, key)
			.then(function(message){
				let messageKey = message.name;
				let channelKey = $routeParams.id
				let data = {id: messageKey}
				messages.addId(channelKey, messageKey, data)
				$scope.messageList = []
				messages.getMessageList(key).then(function(messages){
					for(message in messages){
					let current = messages[message];
					$scope.messageList.push(current);
					}
				})
			})
		}
  });
})