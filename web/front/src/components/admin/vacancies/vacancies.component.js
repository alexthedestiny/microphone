'use strict';

angular.
module('adminVacancies')
.component('adminVacancies', {
  template: require('./vacancies.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$location', 'Main', 'AdminService', '$stateParams', 'VacancyService',
  function adminVacanciesController($translate, $scope, $rootScope, $filter, $location, Main, AdminService, $stateParams, VacancyService) {
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

                VacancyService.LoadAllVacancies();
                $scope.$watch(()=>{
                  return VacancyService.GetAllVacancies()}, 
                  (vacancies)=>{
                    if( angular.isDefined(vacancies) && vacancies.length>0 ){
                      $scope.vacancies = vacancies;
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

        $scope.deleteVacancy = (id) => {
          VacancyService.RemoveVacancy(id).then((responce)=>{
            if(responce && responce.data == 1){
              VacancyService.LoadAllVacancies();
            }
          });
        }
    }
  ]
});
