app.controller("NavCtrl", function($scope, userFactory, $q){

	$scope.isUser = {loggedin: false}

	$scope.login = function(){
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result){
				console.log("user", result.user)
		});
	};


	$scope.logout = function(){
		firebase.auth().signOut().then(function(user){
			// $scope.checkIfLoggedIn();
			// $scope.isUser.loggedin = false;
			console.log('Signed Out');
		})
	}

	firebase.auth().onAuthStateChanged(function(user){
		if(user){
			$scope.$apply(function(){
				$scope.loggedin = true;
				console.log("what", $scope.loggedin);
			})
		}
		else {
			$scope.$apply(function(){
				$scope.loggedin = false;
				console.log("what", $scope.loggedin);
			})
		}
	})
});