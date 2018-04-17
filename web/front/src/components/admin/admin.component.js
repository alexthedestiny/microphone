'use strict';

angular.
  module('admin').
  component('admin', {
    template: require('./admin.template.html'),
    controller: ['$translate', '$timeout', '$http', '$scope', '$rootScope', '$location', '$state', '$stateParams', 'UserService','AdminService',
      function adminController($translate, $timeout, $http, $scope, $rootScope, $location, $state, $stateParams, UserService,AdminService) {
        $scope.openHeader = $stateParams.openHeader;
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
      
      } 
    ]
  });
