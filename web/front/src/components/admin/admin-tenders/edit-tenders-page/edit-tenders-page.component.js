'use strict';

angular.
module('editTendersPage')
.component('editTendersPage', {
  template: require('./edit-tenders-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$location', '$mdDialog', 'Main', 'AdminService', '$stateParams', 'TendersService', 'FileUploader',
  function editTendersPageController($translate, $scope, $rootScope, $location, $mdDialog, Main, AdminService, $stateParams, TendersService, FileUploader) {
  		if($stateParams.tenderId){
  			$scope.tenderId = $stateParams.tenderId;
        TendersService.LoadTendersById($scope.tenderId);
        $scope.$watch(()=>{
          return TendersService.GetTendersById();
        },(tender)=>{
          if(tender && tender.id == $scope.tenderId){
            $scope.tender = tender;
            if($scope.tender.date_start){
              $scope.tender.date_start = new Date(moment($scope.tender.date_start).format());
            }
            if($scope.tender.date_end){
              $scope.tender.date_end = new Date(moment($scope.tender.date_end).format());
            }
          }
        });
  		}
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
        url: '/tenders/updateTendersData/'
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

      $scope.EditTender = () => {
        TendersService.UpdateTenderData($scope.tender).then((responce)=>{
          if(responce && responce.data==1){
            alert('Тендер додано');
          }
        });
      }
    }
  ]
});
