var app = angular.module('CohortWhatever', ['ngRoute']);

app.constant('firebaseUrl', "https://cap-test-77b43.firebaseio.com")

app.config(function($routeProvider) {
    $routeProvider.
    when('/messages', {
        templateUrl: "partials/messages.html",
        controller: 'MessagesCtrl'
    }).
    when('/home', {
        templateUrl: "partials/home.html",
        controller: 'HomeCtrl'
    }).
    when('/jobs', {
        templateUrl: "partials/jobs.html",
        controller: 'JobCtrl'
    }).
    otherwise('/home');
});