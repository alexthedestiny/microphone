'use strict';

angular.
module('aboutPage')
.component('aboutPage', {
  template: require('./about-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'AboutService',
  function aboutPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, AboutService) {
  		AboutService.LoadAbout();
  		$scope.$watch(()=>{
  			return AboutService.GetAbout();
  		},(about)=>{
  			if(about && about.id){
  				$scope.about = about;
  			}
  		});

    }
  ]
});
