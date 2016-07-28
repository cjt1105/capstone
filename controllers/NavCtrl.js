app.controller("NavCtrl", function($scope, userFactory, $q, localStorageService){
	$scope.currentUser = [];

	/// login function that creates new user if they don't exist in the database
	/// and saves the current
	$scope.login = function(){
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result){
				currentUser = result.user;
				$scope.userExists = false;
				userFactory.getUserList()
				.then(function(userList){
					for(user in userList){
						let userItem = userList[user];
						console.log(userItem)
						if(currentUser.uid === userItem.uid){
							console.log("user exists");
							$scope.userExists = true;
						}
					}
				})
				.then(function(){
					if($scope.userExists === false){
						let uid = currentUser.uid;
						let name = currentUser.displayName;
						let photo = currentUser.photoURL;
						let newUser = {
							name: name ,
							profilePicture: photo,
							uid: uid
						};
						userFactory.createUser(newUser, uid)
					}
				})

		});
	};

	//log user out
	$scope.logout = function(){
		firebase.auth().signOut().then(function(user){
		})
	}
/// watch Auth state and set logged in value to toggle sign in/sign out buttons
	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			$scope.$apply(function(){
				$scope.loggedin = true;
			})
			localStorageService.set("currentUser", user);
		}
		else {
			$scope.$apply(function(){
				$scope.loggedin = false;
			})
			localStorageService.set("currentUser", "null");
		}
	})
});