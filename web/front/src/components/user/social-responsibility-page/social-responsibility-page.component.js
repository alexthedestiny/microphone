'use strict';

angular.
module('socialResponsibilityPage')
.component('socialResponsibilityPage', {
  template: require('./social-responsibility-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'SocialResponsibilityService',
  function socialResponsibilityPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, SocialResponsibilityService) {
  		SocialResponsibilityService.LoadSocial();
	    $scope.$watch(()=>{
	        return SocialResponsibilityService.GetSocial();
	    },(responcibility)=>{
	        if(responcibility && responcibility.id){
	        	$scope.responcibility = responcibility;
	        }
	    });
    }
  ]
});
