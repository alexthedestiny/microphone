'use strict';

angular.
module('lifePage')
.component('lifePage', {
  template: require('./life-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function lifePageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {

    }
  ]
});
