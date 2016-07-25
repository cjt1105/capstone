app.controller("NavCtrl", function($scope, userFactory, $q){
	$scope.currentUser = [];

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
							console.log("user exists");
							$scope.currentUser.push(userItem);
						}
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
		}
		else {
			$scope.$apply(function(){
				$scope.loggedin = false;
			})
		}
	})
});