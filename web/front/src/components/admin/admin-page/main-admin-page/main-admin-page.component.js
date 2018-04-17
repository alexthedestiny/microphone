'use strict';

angular.
  module('mainAdminPage')
  .component('mainAdminPage', {
    template: require('./main-admin-page.template.html'),
    controller: ['$scope', '$rootScope', '$stateParams', 'Main', 'AdminService',
      function mainAdminPageController($scope, $rootScope, $stateParams,  Main, AdminService) {
        $scope.userId = $stateParams.userId;
       	$scope.logout = () => {
       		AdminService.Logout();
       	}
      }]});
