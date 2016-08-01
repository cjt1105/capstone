app.controller('ConversationCtrl', function($scope, userFactory, localStorageService, conversations, messages){

	let key;
	$scope.newConvo = true;
	$scope.messageList = [];

	let currentUser = localStorageService.get("currentUser");
	userFactory.getUserList()
	.then(function(users){
		$scope.users = users;
	})

	$scope.handleNewConvo = function(uid){
		$scope.messageList = [];
		$scope.newConvo = true;
		key = null;
		let toUid = uid;
		let fromUid = currentUser.uid;
		key = conversations.createKey(toUid,fromUid);
		let data = {toUid: toUid, fromUid: fromUid};
		/// get convos and check if convo already exists
		conversations.getConvoList()
		.then(function(convos){
			for(let i = 0; i < convos.length; i ++){
				let current = convos[i];
				if(current === key){
					$scope.newConvo = false;
				}
			}
		})
		.then(function(){
			//if not, create convo
			console.log($scope.newConvo)
			if($scope.newConvo === true){
				conversations.createConvo(key, data)
			}
		})
		.then(function(){
			//get current convo messages
			conversations.getConvo(key)
			.then(function(messages){
				for(message in messages){
					let current = messages[message];
					$scope.messageList.push(current)
				}
			})
		})
	}

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
			conversations.postMessage(newMessage, key)
			.then(function(){
				$scope.messageList = []
				conversations.getConvo(key)
				.then(function(messages){
					for(message in messages){
					let current = messages[message];
					$scope.messageList.push(current);
					}
				})
			})
		}
  });
})