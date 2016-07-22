app.controller("NavCtrl", function($scope, userFactory, $q){
	$scope.login = userFactory.login;
	$scope.logout = function(){
		firebase.auth().signOut().then(function(){
			$scope.checkIfLoggedIn();
			console.log('Signed Out');
		})
	}
	$scope.loggedIn = "hey";
	$scope.loggedIn = userFactory.checkIfLoggedIn();
	// console.log('jnrfrfnrjfn', userFactory.checkIfLoggedIn)
	console.log('scop',userFactory.checkIfLoggedIn() )


// 	checkIfLoggedIn($scope);
// 	function checkIfLoggedIn($scope){
// 		$q(function(resolve, reject){
// 			let user = firebase.auth().currentUser;
// 			resolve(user);
// 		}).then(function(user){
// 			console.log(user);
// 			if (user){
// 				loggedin = true;
// 				console.log(loggedin)
// 				return loggedin
// 			}
// 			else {
// 				let loggedin = false;
// 				console.log(loggedin)
// 				return loggedin

// 			}
// 		}).then(function(loggedin){
// 			$scope.loggedIn = loggedin
// 		})
// 	}

// return checkIfLoggedIn
});