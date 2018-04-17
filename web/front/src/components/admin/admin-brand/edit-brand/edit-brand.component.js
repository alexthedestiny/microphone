'use strict';

angular.
module('editBrand')
.component('editBrand', {
  template: require('./edit-brand.template.html'),
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

      BrandsService.LoadBrands();
      $scope.$watch(()=>{
          return BrandsService.GetBrands();
      },(brands)=>{
          if(angular.isDefined(brands) && brands.length > 0){
              $scope.brands = brands;
              console.log($scope.brands);
          }
      });

    }
  ]
});
