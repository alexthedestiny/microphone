'use strict';

angular.
module('userSuggestions')
.component('userSuggestions', {
  template: require('./user-suggestions.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state',
  function userSuggestionsPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state) {

    }
  ]
});
