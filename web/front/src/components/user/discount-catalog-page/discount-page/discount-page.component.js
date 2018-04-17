'use strict';

angular.
module('discountPage')
.component('discountPage', {
  template: require('./discount-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function discountPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {
  		if($stateParams.discountId){
  			$scope.discountId = $stateParams.discountId;
  		}
    }
  ]
});
