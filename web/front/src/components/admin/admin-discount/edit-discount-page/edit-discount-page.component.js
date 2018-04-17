'use strict';

angular.
module('editDiscountPage')
.component('editDiscountPage', {
  template: require('./edit-discount-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location',
  function editDiscountPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location) {
  		if($stateParams.discountId){
  			$scope.discountId = $stateParams.discountId;
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
