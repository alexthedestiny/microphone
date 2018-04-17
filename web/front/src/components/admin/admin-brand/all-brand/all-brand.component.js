'use strict';

angular.
module('allBrand')
.component('allBrand', {
  template: require('./all-brand.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'BrandsService', 'FileUploader',
  function adminBrandController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, BrandsService, FileUploader) {
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
              console.log('aaa', $scope.brands);
          }
      });

      $scope.deleteBrand = function (item) {
          BrandsService.DeleteBrand(item).then((resp)=>{
              if(resp.data){
                  BrandsService.LoadBrands();
              }
          });
      };
    }
  ]
});
