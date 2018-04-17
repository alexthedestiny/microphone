'use strict';

angular.
module('adminPublicInfo')
.component('adminPublicInfo', {
  template: require('./admin-public-info.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'PublicService',
  function adminPublicInfoController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, PublicService) {
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
      PublicService.LoadPublic();
      $scope.$watch(()=>{
        return PublicService.GetPublic();
      },(public_info)=>{
        if(public_info && public_info.id){
          $scope.public_info = public_info;
        }
      });

      $scope.savePublic = ()=>{
        PublicService.UpdatePublic($scope.public_info).then((responce)=>{
          if(responce && responce.data==1){
            alert('Успішно змінено');
          }
        });
      }

    }
  ]
});
