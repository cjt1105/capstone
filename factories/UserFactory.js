app.factory('userFactory', function(){
	let login = function(){
		let config = {
    apiKey: "AIzaSyCvFEbvfcRcano8q8kxmsDltQ8nm9w9ZM0",
    authDomain: "cap-test-77b43.firebaseapp.com",
    databaseURL: "https://cap-test-77b43.firebaseio.com",
    storageBucket: "",
		};
		firebase.initializeApp(config);
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider);
	}
	let checkIfLoggedIn = function(){
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
 			let currentUser = user;
			}
			else {
    		alert("not signed in")
			}
		});
	}
	let getCurrentUser = function(){
		return firebase.auth().cu
	}
	return {login, }
})
