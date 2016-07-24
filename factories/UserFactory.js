app.factory('userFactory', function($q){


	function checkIfLoggedIn() {
			$q(function(resolve, reject){
				let user = firebase.auth().currentUser;
				if (user){
				loggedin = true
				resolve(loggedin)
			}
			else {
				loggedin = false;
				resolve(loggedin)
			}
			}).then(function(loggedin){
				return loggedin
			})
			return loggedin
		}

	let getCurrentUser = function(){
		let user = firebase.auth().currentUser;
	};
	return { checkIfLoggedIn, getCurrentUser}
	})

