'use strict';

angular.
  module('userProfile')
  .component('userProfile', {
    template: require('./user-profile.template.html'),
    controller: ['$scope', '$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'uiCalendarConfig', '$stateParams','$mdpDatePicker', '$mdpTimePicker', 'Main', 'UserService',
      function userProfileController($scope, $rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, uiCalendarConfig, $stateParams, $mdpDatePicker, $mdpTimePicker, Main, UserService) {
        // $scope.userId = $stateParams.userId;
        // UserService.GetUser($scope.userId).then(function(response) {
        //   $scope.userPage = response.data;
        // });
      }]});
