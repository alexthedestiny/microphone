'use strict';

angular.
  module('adminPage')
  .component('adminPage', {
    template: require('./admin-page.template.html'),
    controller: ['$scope', '$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'uiCalendarConfig', '$stateParams','$mdpDatePicker', '$mdpTimePicker', 'Main', 'AdminService', '$location',
      function adminPageController($scope, $rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, uiCalendarConfig, $stateParams, $mdpDatePicker, $mdpTimePicker, Main, AdminService, $location) {
        $scope.userId = $stateParams.userId;
       	if(!$rootScope.adminSession) {
          AdminService.LoadAdminSessionId();
        }
        $scope.$watch(
          AdminService.GetAdminSessionId,
          function(adminSession) {
            if(adminSession){
              if(adminSession && adminSession.data > 0) {
                $rootScope.adminSession = adminSession.data;
                $scope.adminSession = adminSession.data;
              }
              else {
                $rootScope.adminSession = 0;
                $scope.adminSession = undefined;
                $location.path('/admin/login');
              }
            }
          }
        );
      }]});
