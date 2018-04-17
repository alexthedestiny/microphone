'use strict';

angular.
module('adminTrademark')
.component('adminTrademark', {
  template: require('./admin-trademark.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$location', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$state',
  function adminTrademarkController($translate, $scope, $rootScope, $location, $mdDialog, Main, AdminService, $stateParams, $state) {
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
