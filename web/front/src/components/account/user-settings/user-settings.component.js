'use strict';

angular.
  module('userSettings')
  .component('userSettings', {
    template: require('./user-settings.template.html'),
    controller: ['$scope', '$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'FileUploader', 'UserService', '$stateParams',
      function userSettingsController($scope, $rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, FileUploader, UserService, $stateParams) {
     
        $scope.$watch(
          function() {
            return $rootScope.rootUser;
          },
          function(user) {
            if(angular.isDefined(user)) {
              $scope.user = user;
              
            }
          }
        );
      }]});
