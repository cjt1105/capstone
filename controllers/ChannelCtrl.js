app.controller('ChannelCtrl', function($scope, channels, $routeParams, myModal){

	$scope.hideSidebar = false;

	$scope.hey = function(){
		console.log($scope.channelName)
	}

	channels.getChannels()
	.then(function(channels){
		$scope.channels = channels;
		let array = Object.keys(channels);
		$scope.channelNum = array.length;
		console.log(channels)
	})
	.then(function(){
		console.log($scope.channelNum)
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