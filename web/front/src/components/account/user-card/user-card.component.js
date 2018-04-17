'use strict';

angular.
module('userCard')
.component('userCard', {
  template: require('./user-card.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function cardPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {

    }
  ]
});
