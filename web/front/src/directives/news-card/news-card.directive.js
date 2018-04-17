'use strict';

angular.
  module('user')
  .directive('newsCard', function () {
    return {
      restrict: 'E',
      template: require('./news-card.template.html'),
      scope: {
        object: '=',
      },
      controller: ['$scope', '$rootScope', '$mdDialog', '$timeout', 'Main', 'UserService', 'NewsService',
        function($scope, $rootScope, $mdDialog, $timeout, Main, UserService, NewsService) {

        }]
    };
  });
