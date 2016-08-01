var app = angular.module('CohortWhatever', ['ngRoute', 'LocalStorageModule']);

app.constant('firebaseUrl', "https://cap-test-77b43.firebaseio.com");

app.config(function($sceDelegateProvider){
	$sceDelegateProvider.resourceUrlWhitelist([
  'self',
  'https://www.youtube.com/**']);
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

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
