'use strict';

angular.
module('trademarkPage')
.component('trademarkPage', {
  template: require('./trademark-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function trademarkPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {
  		if($stateParams.trademarkId){
  			$scope.trademarkId = $stateParams.trademarkId;
  		}
    }
  ]
});
