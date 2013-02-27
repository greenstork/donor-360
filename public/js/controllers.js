'use strict';

/* Controllers */

function SearchCtrl($scope, $http) {
  $scope.searchInput = '';
  $scope.search = function () {
    $http.get('/api/search', $scope.searchInput).
      success(function(data, status, headers, config) {
        $scope.results = data.results;
        console.log('SEARCH RESULTS RETURNED');
      });
  };
}

function DonorInfoCtrl($scope, $http, $routeParams) {
  $http.get('/api/donor-info', $routeParams.id).
    success(function(data) {
      $scope.donorInfo = data.donorInfo;
    });
}

function DonorSocialCtrl($scope, $http, $routeParams) {
  $http.get('/api/donor-social', $routeParams.id).
    success(function(data) {
      $scope.posts = data.posts;
    });
}

function DonorToDoCtrl($scope, $http, $routeParams) {
  $http.get('/api/donor-todo', $routeParams.id).
    success(function(data) {
      $scope.todoItems = data.items;
    });
}

function DonorTimelineCtrl($scope, $http, $routeParams) {
  $http.get('/api/donor-timeline', $routeParams.id).
    success(function(data) {
      $scope.timeline = data.timeline;
    });
}
