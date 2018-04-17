'use strict';

angular.
module('consultantPage')
.component('consultantPage', {
  template: require('./consultant-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function consultantPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {

    }
  ]
});
