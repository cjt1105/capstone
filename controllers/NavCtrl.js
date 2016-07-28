app.controller("NavCtrl", function($scope, userFactory, $q, localStorageService){
	$scope.currentUser = localStorageService.get("currentUser");
	$scope.userExists = false;

	/// login function that creates new user if they don't exist in the database
	/// and saves the current
	$scope.login = function(){
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result){
				currentUser = result.user;
				userFactory.getUserList()
				.then(function(userList){
					for(user in userList){
						let userItem = userList[user];
						if(currentUser.uid === userItem){
							$scope.userExists = true;
							console.log($scope.userExists)
						}

					}

				})
				.then(function(){
					watchLogin()
				})
				// .then(function(){
				// 	console.log($scope.userExists)
				// 	if ($scope.userExists === false){
				// 		let name= currentUser.displayName;
				// 		let email= currentUser.email;
				// 		let uid= currentUser.uid;
				// 		let profilePicture = currentUser.photoURL;
				// 		let newUser = {
				// 			name: name,
				// 			email: email,
				// 			uid: uid,
				// 			profilePicture: profilePicture
				// 		}
				// 		userFactory.createUser(newUser);
				// 	}
				// })

		});
	};

	//log user out
	$scope.logout = function(){
		firebase.auth().signOut().then(function(user){
		})
	}
/// watch Auth state and set logged in value to toggle sign in/sign out buttons
	watchLogin();
	function watchLogin(){
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				$scope.$apply(function(){
					$scope.loggedin = true;
				})
				localStorageService.set("currentUser", user)
			}
			else {
				$scope.$apply(function(){
					$scope.loggedin = false;
				})
				localStorageService.set("currentUser", "null")
			}
		})
	}

});