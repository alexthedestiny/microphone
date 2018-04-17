'use strict';

angular.
module('tendersPage')
.component('tendersPage', {
  template: require('./tenders-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'TendersService',
  function tendersPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, TendersService) {
  		TendersService.LoadAllTenders();
  		$scope.$watch(()=>{
  			return TendersService.GetAllTenders();
  		},(tenders)=>{
  			if(tenders && tenders.length>0){
  				$scope.tenders = tenders;
  			}
  		});
    }
  ]
});
