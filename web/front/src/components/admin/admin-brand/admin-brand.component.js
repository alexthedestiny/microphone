'use strict';

angular.
module('adminBrand')
.component('adminBrand', {
  template: require('./admin-brand.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'BrandsService',
  function adminBrandController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, BrandsService) {
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
