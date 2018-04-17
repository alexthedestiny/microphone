'use strict';

angular.
module('adminAbout')
.component('adminAbout', {
  template: require('./admin-about.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'AboutService',
  function adminAboutController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, AboutService) {
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
      AboutService.LoadAbout();
      $scope.$watch(()=>{
        return AboutService.GetAbout();
      },(about)=>{
        if(about && about.id){
          $scope.about = about;
        }
      });

      $scope.saveAbout = ()=>{
        AboutService.UpdateAbout($scope.about).then((responce)=>{
          if(responce && responce.data==1){
            alert('Успішно змінено');
          }
        });
      }

    }
  ]
});
