'use strict';

angular.
module('adminTenders')
.component('adminTenders', {
  template: require('./admin-tenders.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$location', '$mdDialog', 'Main', 'AdminService', '$stateParams', 'TendersService',
  function adminTendersController($translate, $scope, $rootScope, $location, $mdDialog, Main, AdminService, $stateParams, TendersService) {
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
      TendersService.LoadAllTenders();
      $scope.$watch(()=>{
        return TendersService.GetAllTenders();
      },(tenders)=>{
        if(tenders && tenders.length>0){
          $scope.tenders = tenders;
        }
      });

      $scope.removeTender = (id)=>{
        TendersService.RemoveTender(id).then((responce)=>{
          if(responce && responce.data == 1){
            TendersService.LoadAllTenders();
          }
        });
      }


    }
  ]
});
