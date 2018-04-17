'use strict';

angular.
module('addBrand')
.component('addBrand', {
  template: require('./add-brand.template.html'),
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

      $scope.brand = {};
      $scope.image = {
          originalImage: '',
          croppedImage: ''
      };
      var uploader = $scope.uploaderAvatar = new FileUploader({
          url: '/brands/addBrand'
      });
      uploader.onAfterAddingFile = function(item) {
          var reader = new FileReader();
          reader.onload = function(event) {
              $scope.$apply(function(){
                  $scope.image.originalImage = event.target.result;
              });
          };
          reader.readAsDataURL(item._file);
      };
      uploader.onBeforeUploadItem = function(item) {
          var blob = dataURItoBlob($scope.image.croppedImage);
          item._file = blob;
      };
      var dataURItoBlob = Main.dataURItoBlob;
      //upload image end

      $scope.save = () => {
          BrandsService.CreateBrand($scope.brand).then((response)=>{
              $scope.brand = {};
              console.log('response', response);
          });
      }

    }
  ]
});
