'use strict';

angular.
  module('adminLogin')
  .component('adminLogin', {
    template: require('./admin-login.template.html'),
    controller: ['$scope', '$rootScope', '$state', '$stateParams', 'Main', 'AdminService', '$location', '$timeout',
      function adminLoginController($scope, $rootScope, $state, $stateParams, Main, AdminService, $location, $timeout) {
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
                $state.go('admin.profile', {userId:parseInt($scope.adminSession)});
              }
            }
          }
        );
      	$scope.admin = {};
     		$scope.adminLogin = (admin) => {
     			AdminService.Login(admin.login, admin.password, (response)=>{
     				if(response.success){;
              $state.go('admin.profile', {userId:parseInt(response.data)});
     					$timeout(()=>{$location.path('/admin/'+response.data);}, 500);
     				}else{
     					alert('error!');
     				}
     			});
     		}

  }]});
