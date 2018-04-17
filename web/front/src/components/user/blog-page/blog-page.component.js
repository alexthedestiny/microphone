'use strict';

angular.
module('blogPage')
.component('blogPage', {
  template: require('./blog-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function blogPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {

    }
  ]
});
