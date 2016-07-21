app.controller("NavCtrl", function($scope, userFactory){
	// $scope.checkIfLoggedIn = userFactory.checkIfLoggedIn;
	// $scope.checkIfLoggedIn();
	$scope.login = userFactory.login;

});