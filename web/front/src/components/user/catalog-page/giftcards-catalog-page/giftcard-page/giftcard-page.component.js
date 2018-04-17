'use strict';

angular.
module('giftcardPage')
.component('giftcardPage', {
  template: require('./giftcard-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function giftcardPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {
  		if($stateParams.giftcardId){
  			$scope.giftcardId = $stateParams.giftcardId;
  		}
    }
  ]
});
