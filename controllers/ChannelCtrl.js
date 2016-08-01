app.controller('ChannelCtrl', function($scope, channels, $routeParams){

	channels.getChannels()
	.then(function(channels){
		$scope.channels = channels
	})

	$scope.addChannel = function(){
		let data = {name: $scope.channelName};
		$scope.channelName = "";
		channels.addChannel(data)
		.then(function(newChannel){
			let key = newChannel.name;
			let data = {channelId: key};
			channels.patchChannel(key,data)
			.then(function(result){
				$scope.channels = [];
				channels.getChannels()
				.then(function(channels){
					$scope.channels = channels
				})
			})
		})
	}
})