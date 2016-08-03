var app = angular.module('CohortWhatever', ['ngRoute', 'LocalStorageModule', 'btford.modal']);

app.constant('firebaseUrl', "https://cap-test-77b43.firebaseio.com");

app.config(function($sceDelegateProvider){
	$sceDelegateProvider.resourceUrlWhitelist([
  'self',
  'https://www.youtube.com/**']);
})

app.factory('myModal', function (btfModal) {
  return btfModal({
    controller: 'MyModalCtrl',
    controllerAs: 'modal',
    templateUrl: 'views/channelModal.html'
  });
})

app.controller('MyModalCtrl', function (myModal) {
  this.closeMe = myModal.deactivate;
})

app.controller('MyCtrl', function (myModal) {
  this.showModal = myModal.activate;
})

app.config(function($routeProvider) {
    $routeProvider.
    when('/messages/:name/:id', {
        templateUrl: "views/messages.html",
        controller: 'MessagesCtrl'
    }).
    when('/home', {
        templateUrl: "views/home.html",
        controller: 'HomeCtrl'
    }).
    when('/jobs', {
        templateUrl: "views/jobs.html",
        controller: 'JobCtrl'
    }).
    when('/profile/:id', {
        templateUrl: "views/profile.html",
        controller: 'ProfileCtrl'
    }).
    when('/conversations/:id', {
        templateUrl: "views/conversations.html",
        controller: 'ConversationCtrl'
    }).
    otherwise('/home');
});
