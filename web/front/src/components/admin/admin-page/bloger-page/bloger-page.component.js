'use strict';

angular.
  module('blogerPage')
  .component('blogerPage', {
    template: require('./bloger-page.template.html'),
    controller: ['$scope', '$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'uiCalendarConfig', '$stateParams','$mdpDatePicker', '$mdpTimePicker', 'Main', 'UserService',
      function blogerPageController($scope, $rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, uiCalendarConfig, $stateParams, $mdpDatePicker, $mdpTimePicker, Main, UserService) {
        $scope.userId = $stateParams.userId;
       
      }]});
