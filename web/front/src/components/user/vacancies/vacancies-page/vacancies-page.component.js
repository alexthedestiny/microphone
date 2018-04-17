'use strict';

angular.
module('vacanciesPage')
.component('vacanciesPage', {
  template: require('./vacancies-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'VacancyService',
  function vacanciesPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, VacancyService) {
  		if($stateParams.vacancyId){
  			$scope.vacancyId = $stateParams.vacancyId;
  			VacancyService.LoadVacanciesById($scope.vacancyId);
  			$scope.$watch(()=>{
  				return VacancyService.GetVacanciesById();
  			},(vacancy)=>{
  				if( angular.isDefined(vacancy) && vacancy.id == $scope.vacancyId){
  					$scope.vacancy = vacancy;
            if($scope.vacancy.photo){
              $scope.vacancy.photoAddress = '/uploads/vacancies/images/'+$scope.vacancy.photo;
            }else{
              $scope.vacancy.photoAddress = 'https://upload.wikimedia.org/wikipedia/commons/6/6a/A_blank_flag.png';
            }
  				}
  			});
  		}
    }
  ]
});
