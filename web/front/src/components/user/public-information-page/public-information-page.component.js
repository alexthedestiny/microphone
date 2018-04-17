'use strict';

angular.
module('publicInformationPage')
.component('publicInformationPage', {
  template: require('./public-information-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'PublicService',
  function publicInformationPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, PublicService) {
  		PublicService.LoadPublic();
  		$scope.$watch(()=>{
  			return PublicService.GetPublic();
  		},(public_info)=>{
  			if(public_info && public_info.post){
  				$scope.public_info = public_info;
  			}
  		});
    }
  ]
});
