'use strict';

angular.
  module('user')
  .directive('cartProductCard', function () {
    return {
      restrict: 'E',
      template: require('./cart-product-card.template.html'),
      scope: {
        object: '=',
      },
      controller: ['$scope', '$rootScope', '$mdDialog', '$timeout', 'Main', 'UserService', 'NewsService',
        function($scope, $rootScope, $mdDialog, $timeout, Main, UserService, NewsService) {
        }]
    };
  });
