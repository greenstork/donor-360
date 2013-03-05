'use strict';

/* Controllers */

function LoginCtrl($http, $location) {
  $http.get('/api/login').
    success(function() {
      $location.path('/');
    });
}

function SearchCtrl($scope, $http, $location) {
  $scope.searchInput = undefined;
  $scope.search = function (input) {
    console.log($scope.searchInput);
    $http.get('/api/search/' + $scope.searchInput).
      success(function(data, status) {
        $scope.results = data.results;
        console.log('SEARCH RESULTS RETURNED: ' + JSON.stringify(data));
      }).
      error(function(data, status, headers, config) {
        console.log(data,status,headers);
      });
  };
}

function DonorInfoCtrl($scope, $http, $routeParams) {
  $http.get('/api/donor-info/' + $routeParams.id).
    success(function(data) {
      console.log('DONOR INFO RETURNED: ' + JSON.stringify(data.info));
      $scope.donorInfo = data.info;
    });
}

function DonorSocialCtrl($scope, $http, $routeParams) {
  $http.get('/api/donor-social/' + $routeParams.id).
    success(function(data) {
      $scope.posts = data.posts;
    });
}

function DonorToDoCtrl($scope, $http, $routeParams) {
  $http.get('/api/donor-todo/' + $routeParams.id).
    success(function(data) {
      $scope.todoItems = data.items;
    });
}

function DonorTimelineCtrl($scope, $http, $routeParams) {
  $http.get('/api/donor-timeline/' + $routeParams.id).
    success(function(data) {
      $scope.timeline = data.timeline;
    });
}
