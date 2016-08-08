app.controller("SidebarCtrl", function($location, $window, $scope, conversations, localStorageService){

	$scope.convoInfo = [];

	$scope.$on('$routeChangeSuccess', function(next, current) {
   	let path = $window.location.href;
   	if(path === "http://localhost:8080/#/home"){
   		$scope.hideSidebar = true;
   	} else {
   		$scope.hideSidebar = false;
   		console.log("falssee")
   	}
 	});

	if($scope.hideSidebar === false){
			let currentUser = localStorageService.get("currentUser");
			console.log(currentUser)
			conversations.getConvoList()
			.then(function(conversations){
				for(conversation in conversations){
					let current = conversations[conversation];
					if(currentUser.displayName != current.info.from &&currentUser.displayName === current.info.to){
						console.log("hey")
						$scope.convoInfo.push({name: current.info.from, id: current.info.id})
					}
					if(currentUser.displayName != current.info.to&&currentUser.displayName === current.info.from){
						$scope.convoInfo.push({name: current.info.to, id: current.info.id})
					}
				}
			})
	}
})