app.controller("SidebarCtrl", function($location, $window, $scope){

	$scope.hideSidebar = false;

	$scope.$on('$routeChangeSuccess', function(next, current) {
   	let path = $window.location.href;
   	if(path === "http://localhost:8080/#/home"){
   		$scope.hideSidebar = true;
   	} else {
   		$scope.hideSidebar = false;
   	}
 	});
})