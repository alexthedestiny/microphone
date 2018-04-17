'use strict';

angular.
module('editBrandPage')
.component('editBrandPage', {
  template: require('./edit-brand-page.template.html'),
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
              $scope.adminSession = undefined;;
              $location.path('/admin/login');
            }
          }
        }
      );
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


      $scope.image = {
          originalImage: '',
          croppedImage: ''
      };
      var uploader = $scope.uploaderAvatar = new FileUploader({
          url: '/brands/editBrand'
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
          BrandsService.EditBrand($scope.brand).then((response)=>{
             console.log('response', response);
          });
      }

    }
  ]
});
