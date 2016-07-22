app.factory('userFactory', function($q){

	let login = function(){
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(){
			checkIfLoggedIn()
		})
	};

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
			// if (user){
			// 	loggedin = true;
			// 	console.log(loggedin)
			// }
			// else {
			// 	loggedin = false;
			// 	console.log(loggedin)

			// }
		// })
		// console.log('this my shit', loggedin)
		// return loggedin
	// }


	let getCurrentUser = function(){
		let user = firebase.auth().currentUser;
	};
	return {login, checkIfLoggedIn, getCurrentUser}
	})

