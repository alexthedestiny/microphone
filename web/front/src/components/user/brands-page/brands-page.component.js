'use strict';

angular.
module('brandsPage')
.component('brandsPage', {
  template: require('./brands-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'BrandsService', 'FileUploader',
  function adminBrandController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, BrandsService, FileUploader) {
  		if(!$rootScope.adminSession) {
        AdminService.LoadAdminSessionId();
      }

      BrandsService.LoadBrands();
      $scope.$watch(()=>{
          return BrandsService.GetBrands();
      },(brands)=>{
          if(angular.isDefined(brands) && brands.length > 0){
              $scope.brands = brands;
          }
      });
    }
  ]
});
