'use strict';

// Declare app level module which depends on views, and components
angular.module('angularwebapp', [
  'ngRoute',
  'angularwebapp.home',
  'angularwebapp.register',
  'angularwebapp.welcome',
  'angularwebapp.addpost'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  
  $routeProvider.otherwise({redirectTo: '/home'});

}]);
