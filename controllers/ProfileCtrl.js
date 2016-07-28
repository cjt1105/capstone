app.controller("ProfileCtrl", function($scope, profile){

	let user = profile.getUser;
	user()
	.then(function(user){
		$scope.profilePicture = user.profilePicture;
		$scope.userName = user.name
	})




})