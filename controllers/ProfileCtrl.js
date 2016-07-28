app.controller("ProfileCtrl", function($scope, profile, localStorageService){
	/// variables and states
	let currentUser = localStorageService.get("currentUser");
	$scope.editProfile = false;
	$scope.canEdit = false;
	let userKey = []

	profile.getUser(userKey)
	.then(function(user){
		userKey = [];
		console.log(userKey)
		$scope.user = user;
		if (currentUser.uid === user.uid){
			$scope.canEdit = true;
		}
		if($scope.user.aboutMe != undefined){
			$scope.hasAboutMe = true;
		}
	})
	.then(function(){
		console.log($scope.hasAboutMe)
	})

	$scope.saveChanges = function(){
		let aboutMe = $scope.aboutMe;
		$scope.aboutMe = "";
		let github = $scope.github;
		$scope.github = "";
		let website = $scope.personalWebsite;
		$scope.personalWebsite = "";
		let changes = {
			aboutMe: aboutMe,
			github: github,
			website: website
		}
		profile.editUser(userKey[0], changes)
		$scope.editProfile = false;
	}


	// user()
	// .then(function(user){
	// 	// $scope.profilePicture = user.profilePicture;
	// 	// $scope.userName = user.name;
	// 	// $scope
	// })




})