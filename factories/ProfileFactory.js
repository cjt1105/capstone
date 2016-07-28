app.factory("profile", function($http, firebaseUrl, $q, $routeParams){


	getUser = function(array){
		let uid = $routeParams.id;
		return $q(function(resolve, reject){
			console.log("heyyyy", uid);
			$http.get(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
			.success(function(user){
				let key = Object.keys(user);
				console.log(key)
				resolve(user[key]);
				array.push(key);
			})
			.error(function(error) {
				reject(error);
			});
		});
	}

	// let editUser = function(changes){
	// 	$http.patch(`${firebaseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`, JSON.stringify({"hey": "hello"}))
	// }

	let editUser = function(key, changes) {
		console.log(changes)
		return $q(function(resolve, reject) {
            $http.patch(`${firebaseUrl}/users/${key}.json`, changes)
                .success(function(ObjFromFirebase) {
                    console.log(ObjFromFirebase)
                    resolve(ObjFromFirebase)
                })
                .error(function (error) {
                    reject (error);
                });
        });
	}


	return {getUser, editUser}
})