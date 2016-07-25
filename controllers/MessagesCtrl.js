app.controller("MessagesCtrl", function($scope, messages){
	$scope.messageList = [];
	let getMessages = messages.getMessageList;
	getMessages().then(function(messages){
		for(message in messages){
			let current = messages[message];
			$scope.messageList.push(current)
		}
	})

  $(document).ready(function() {
    $("#example1").emojioneArea();
  });

})