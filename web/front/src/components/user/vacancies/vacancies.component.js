'use strict';

angular.
module('vacancies')
.component('vacancies', {
  template: require('./vacancies.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'VacancyService',
  function vacanciesController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, VacancyService) {
  		VacancyService.LoadAllVacancies();
        $scope.$watch(()=>{
          return VacancyService.GetAllVacancies()}, 
          (vacancies)=>{
            if( angular.isDefined(vacancies) && vacancies.length>0 ){
              $scope.vacancies = vacancies;
            }
          });
    }
  ]
});
