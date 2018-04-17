'use strict';

angular.
module('editTrademarkPage')
.component('editTrademarkPage', {
  template: require('./edit-trademark-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location',
  function editTrademarkPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location) {
  		if($stateParams.trademarkId){
  			$scope.trademarkId = $stateParams.trademarkId;
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
    }
  ]
});
