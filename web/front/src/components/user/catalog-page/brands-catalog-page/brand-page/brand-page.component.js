'use strict';

angular.
module('brandPage')
.component('brandPage', {
  template: require('./brand-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function brandPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {
  		if($stateParams.brandId){
  			$scope.brandId = $stateParams.brandId;
  		}
    }
  ]
});
