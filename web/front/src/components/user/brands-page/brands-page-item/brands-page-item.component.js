'use strict';

angular.
module('brandsPageItem')
.component('brandsPageItem', {
  template: require('./brands-page-item.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'BrandsService', 'FileUploader',
  function adminBrandController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, BrandsService, FileUploader) {
  		if(!$rootScope.adminSession) {
        AdminService.LoadAdminSessionId();
      }

      if($stateParams.id_brand){
          $scope.id_brand = $stateParams.id_brand;
          BrandsService.LoadBrandById($scope.id_brand);
          $scope.$watch(()=>{
              return BrandsService.GetBrandById();
          },(brand)=>{
              if(brand){
                  $scope.brand = brand;
                  if($scope.brand.photo){
                      $scope.brand.photoAddress = '/uploads/brands/images/'+$scope.brand.photo;
                  }else{
                      $scope.brand.photoAddress = 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png';
                  }
              }
          });
      }

    }
  ]
});
