'use strict';

angular.
  module('moderatorPage')
  .component('moderatorPage', {
    template: require('./moderator-page.template.html'),
    controller: ['$scope', '$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'uiCalendarConfig', '$stateParams','$mdpDatePicker', '$mdpTimePicker', 'Main', 'UserService',
      function moderatorPageController($scope, $rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, uiCalendarConfig, $stateParams, $mdpDatePicker, $mdpTimePicker, Main, UserService) {
        $scope.userId = $stateParams.userId;
       
      }]});
