'use strict';

angular.module('angularwebapp.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){

		$routeProvider.when('/welcome', {
			templateUrl:'welcome/welcome.html',
			controller: 'WelcomeCtrl'
		});

}])

.controller('WelcomeCtrl', ['$scope', '$location', '$firebaseArray', '$firebaseObject', 'CommonProp', function($scope, $location,$firebaseArray, $firebaseObject, CommonProp){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}
	
	var ref = firebase.database().ref().child('Articles');
	$scope.articles = $firebaseArray(ref);
	console.log($scope.articles);
	
	$scope.editPost = function(id){
		var ref = firebase.database().ref().child('Articles/' + id);
		$scope.editPostData = $firebaseObject(ref);
	}
	$scope.updatePost = function(id){
		var ref = firebase.database().ref().child('Articles/' + id);
		ref.update({
			title: $scope.editPostData.title,
			post: $scope.editPostData.post
		}).then(function(ref){
			$("#editModal").modal('hide');
		}, function(error){
			console.log(error);
		});
	};

	$scope.deleteCnf = function(article){
		$scope.deleteArticle = article;
	};

	$scope.deletePost = function(deleteArticle){
		$scope.articles.$remove(deleteArticle);
		$("#deleteModal").modal('hide');
	};

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}])
