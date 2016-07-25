app.factory('userFactory', function($q, $http, firebaseUrl){


	let getUserList = function(){
		let users = [];
    return $q(function(resolve, reject) {
      $http.get(`${firebaseUrl}/users.json`)
      .success(function(usersArray) {
        if (usersArray) {
        let userList = usersArray;
        Object.keys(userList).forEach(function(key) {
          userList[key].id=key;
          users.push(userList[key]);
        });
      }
        resolve(users)
      })
      .error(function(error) {
        reject(error);
      })
    });

	}

	let getCurrentUser = function(){
		let user = firebase.auth().currentUser;
	};
	return { getCurrentUser, getUserList}
	})

