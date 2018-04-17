'use strict';

angular.
module('wishesList')
.component('wishesList', {
  template: require('./wishes-list.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  	function wishesListController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {
  		$scope.$watch(()=>{
        	return $rootScope.userSession;
        },(userSession)=>{
          if(userSession){
            UserService.loadUserById(userSession);
            $scope.$watch(()=>{
              return UserService.getUserById();
            },(user)=>{
              if(user && user.length>0){
                $scope.user = user[0];
              }
            });
          }
        	
        });
    }
  ]
});
