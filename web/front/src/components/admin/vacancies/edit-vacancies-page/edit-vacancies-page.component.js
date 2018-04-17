'use strict';

angular.
module('editVacanciesPage')
.component('editVacanciesPage', {
  template: require('./edit-vacancies-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$location', 'Main', 'AdminService', '$stateParams', 'VacancyService', 'FileUploader',
  function EditVacanciesPageController($translate, $scope, $rootScope, $filter, $location, Main, AdminService, $stateParams, VacancyService, FileUploader) {
  		if($stateParams.vacancyId){
  			$scope.vacancyId = $stateParams.vacancyId;
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
                VacancyService.LoadVacanciesById($scope.vacancyId);
                $scope.$watch(()=>{
                  return VacancyService.GetVacanciesById();
                },(vacancy)=>{
                  if( angular.isDefined(vacancy) && vacancy.id == $scope.vacancyId){
                    $scope.vacancy = vacancy;
                  }
                });
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
          url: '/vacancy/updateVacancyData/'
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

        $scope.editVacancy = () => {
          VacancyService.UpdateVacancyData($scope.vacancy).then((responce)=>{
            if(responce && responce.data == 1){
              alert('Успешно обновлено');
            }
          });
        }


    }
  ]
});
