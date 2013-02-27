'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: SearchCtrl
      }).
      when('/donor-info/:id', {
        templateUrl: 'partials/donor-info',
        controller: DonorInfoCtrl
      }).
      when('/donor-social/:id', {
        templateUrl: 'partials/donor-social',
        controller: DonorSocialCtrl
      }).
      when('/donor-todo/:id', {
        templateUrl: 'partials/donor-todo',
        controller: DonorToDoCtrl
      }).
      when('/donor-timeline/:id', {
        templateUrl: 'partials/donor-timeline',
        controller: DonorTimelineCtrl
      }).
      when('/oauth/authorize', {
        redirect: 'oauth/authorize'
      });
      
    $locationProvider.html5Mode(true);
  }]);