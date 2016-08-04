app.controller("NavCtrl", function($scope, userFactory, $q, localStorageService, $location){

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
						if(currentUser.uid === userItem.uid){
							$scope.userExists = true;
						}

					}

				})
				.then(function(){
					watchLogin()
				})
				.then(function(){
					if ($scope.userExists === false){
						let name= currentUser.displayName;
						let email= currentUser.email;
						let uid= currentUser.uid;
						let profilePicture = currentUser.photoURL;
						let newUser = {
							name: name,
							email: email,
							uid: uid,
							profilePicture: profilePicture
						}
						console.log("mycurrent", currentUser)
						userFactory.createUser(newUser);
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
	watchLogin();
	function watchLogin(){
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				$scope.$apply(function(){
					$scope.loggedin = true;
				})
				localStorageService.set("currentUser", user);
				$scope.currentUser = localStorageService.get("currentUser");
				$location.path('messages/general/-KO5zsxnDELiS6pHFHps');

			}
			else {
				$scope.$apply(function(){
					$scope.loggedin = false;
				})
				console.log("WTZF")
				// localStorageService.set("currentUser", "null")
			}
		})
	}

});