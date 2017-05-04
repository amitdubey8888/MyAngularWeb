'use strict';

angular.module('angularwebapp.addpost', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){

		$routeProvider.when('/addpost', {
			templateUrl:'addpost/addpost.html',
			controller: 'AddPostCtrl'
		});

}])
.controller('AddPostCtrl', ['$scope','$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var ref = firebase.database().ref().child('Articles');
	$scope.articles = $firebaseArray(ref);
	console.log($scope.articles);

	$scope.createPost = function(){
		var title = $scope.article.titleTxt;
		var post = $scope.article.postTxt;
		$scope.articles.$add({
			title: title,
			post: post
		}).then(function(ref) {
			console.log(ref);
			$scope.success = true;
			window.setTimeout(function(){
			  $scope.$apply(function(){
				$scope.success = false;
			  });
			}, 2000);
		  }, function(error){
		  	console.log(error); 
		});
	};

}])