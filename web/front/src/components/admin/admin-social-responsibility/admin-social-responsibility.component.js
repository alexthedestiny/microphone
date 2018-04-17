'use strict';

angular.
module('adminSocialResponsibility')
.component('adminSocialResponsibility', {
  template: require('./admin-social-responsibility.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'SocialResponsibilityService',
  function adminSocialResponsibilityController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, SocialResponsibilityService) {
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
      SocialResponsibilityService.LoadSocial();
      $scope.$watch(()=>{
        return SocialResponsibilityService.GetSocial();
      },(responcibility)=>{
        if(responcibility && responcibility.id){
          $scope.responcibility = responcibility;
        }
      });

      $scope.save = ()=>{
        SocialResponsibilityService.UpdateSocial($scope.responcibility).then((responce)=>{
          if(responce && responce.data==1){
            alert('Успішно змінено');
          }
        });
      }

    }
  ]
});
