'use strict';

angular.
module('addVacanciesPage')
.component('addVacanciesPage', {
  template: require('./add-vacancies-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$location', '$mdDialog', 'Main', 'AdminService', '$stateParams', 'VacancyService', 'FileUploader',
  function addVacanciesPageController($translate, $scope, $rootScope, $location, $mdDialog, Main, AdminService, $stateParams, VacancyService, FileUploader) {
      $scope.vacancy = {};
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

      $scope.addVacancy = ()=>{
        VacancyService.CreateVacancy($scope.vacancy).then((responce)=>{
          if(responce && responce.data == '1'){
            alert('вакансия успешно добавлена');
          }
        });
      }

      //upload image start
      $scope.image = {
        originalImage: '',
        croppedImage: ''
      };
      var uploader = $scope.uploaderAvatar = new FileUploader({
        url: '/vacancy/create/'
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


    }
  ]
});
