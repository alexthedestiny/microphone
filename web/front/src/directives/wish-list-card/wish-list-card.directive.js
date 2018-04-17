'use strict';

angular.
  module('user')
  .directive('wishListCard', function () {
    return {
      restrict: 'E',
      template: require('./wish-list-card.template.html'),
      scope: {
        object: '=',
      },
      controller: ['$scope', '$rootScope', '$mdDialog', '$timeout', 'Main', 'UserService', 'NewsService',
        function($scope, $rootScope, $mdDialog, $timeout, Main, UserService, NewsService) {
        }]
    };
  });
