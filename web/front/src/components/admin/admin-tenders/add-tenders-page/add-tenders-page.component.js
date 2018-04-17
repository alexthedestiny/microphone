'use strict';

angular.
module('addTendersPage')
.component('addTendersPage', {
  template: require('./add-tenders-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$location', '$mdDialog', 'Main', 'AdminService', '$stateParams', 'FileUploader', 'TendersService',
  function addTendersPageController($translate, $scope, $rootScope, $location, $mdDialog, Main, AdminService, $stateParams, FileUploader, TendersService) {
      $scope.tender = {};
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
      //upload image start
      $scope.image = {
        originalImage: '',
        croppedImage: ''
      };
      var uploader = $scope.uploaderAvatar = new FileUploader({
        url: '/tenders/create/'
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

      $scope.addTender = () => {
        TendersService.CreateTender($scope.tender).then((responce)=>{
          if(responce && responce.data==1){
            alert('Тендер додано');
          }
        });
      }
    }
  ]
});
