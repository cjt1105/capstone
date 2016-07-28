app.factory("profile", function($http, firebaseUrl, $q, $routeParams){

	let uid = $routeParams.id;

	getUser = function(){
		return $q(function(resolve, reject){
			$http.get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
			.success(function(user){
				let key = Object.keys(user)
				resolve(user[key]);
			})
			.error(function(error) {
				reject(error);
			});
		});
	}




	// let getBoards = function() {
	// 	let board = [];
	// 	return $q(function(resolve, reject) {
	// 		let currentUser = localStorageService.get('currentUser');
	// 		console.log(currentUser);
	// 		let userId = currentUser.uid
	// 		console.log("user id?", userId);
	// 		$http.get(`${FirebaseURL}/board.json?orderBy="uid"&equalTo="${userId}"`)
	// 		.success(function(boardObject) {
	// 			let boardCollection = boardObject;
	// 			//create array from object and loop thru keys - saving fb key for each item inside the obj as an id property
	// 			Object.keys(boardCollection).forEach(function(key){
	// 				boardCollection[key].id=key;
	// 				board.push(boardCollection[key]);
	// 			});
	// 			console.log("items:", board);
	// 			resolve(board);
	// 		})
	// 		.error(function(error) {
	// 			reject(error);
	// 		});
	// 	});
	// };



	return {getUser}
})