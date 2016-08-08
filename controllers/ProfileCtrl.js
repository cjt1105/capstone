app.controller("ProfileCtrl", function($scope, $location, profile, localStorageService, $route){
	/// variables and states
	let currentUser = localStorageService.get("currentUser");
	$scope.editProfile = false;
	$scope.canEdit = false;
	let userKey = [];

	profile.getUser(userKey)
	.then(function(user){
		$scope.user = user;
		if (currentUser.uid === user.uid){
			$scope.canEdit = true;
		};
		if($scope.user.aboutMe != undefined){
			$scope.hasAboutMe = true;
		};
		if($scope.user.github != undefined){
			$scope.hasGithub = true;
		};
		if($scope.user.website != undefined){
			$scope.hasWebsite = true;
		};
	})

	$scope.saveChanges = function(){
		let aboutMe = $scope.aboutMe;
		let github = $scope.github;
		let website = $scope.personalWebsite;
		let changes = {};
		if(aboutMe != undefined&&aboutMe != ""){
			console.log("whatitis",aboutMe)
			changes.aboutMe = aboutMe;
		}
		if(github != undefined&&aboutMe != ""){
			changes.github = github;
		}
		if(website != undefined&&aboutMe != ""){
			changes.website = website;
		}
		if(aboutMe != undefined|github != undefined|website != undefined){
			profile.editUser(userKey[0], changes)
			.then(function(user){
				userKey = [];
				$scope.aboutMe = "";
				$scope.github = "";
				$scope.personalWebsite = "";
				profile.getUser(userKey)
				.then(function(user){
					$scope.editProfile = false;
					$route.reload();
				})
			})
		}
	}

})