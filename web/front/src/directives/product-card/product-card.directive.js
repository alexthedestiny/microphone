'use strict';

angular.
  module('user')
  .directive('productCard', function () {
    return {
      restrict: 'E',
      template: require('./product-card.template.html'),
      scope: {
        object: '=',
      },
      controller: ['$scope', '$rootScope', '$mdDialog', '$timeout', 'Main', 'UserService', 'CartService', 'WishlistService',
        function($scope, $rootScope, $mdDialog, $timeout, Main, UserService, CartService, WishlistService) {
          $scope.addToCart = (id_product) => {
            let count = prompt("Введіть кількість товарів", 1);
            CartService.AddToCart(id_product, count).then(()=>{
              CartService.LoadSessionCart();
            });
          }

          $scope.addToWishlist = (id_product) => {
            let count = prompt("Введіть кількість товарів", 1);
            WishlistService.AddToWishlist(id_product, count).then(()=>{
              WishlistService.LoadSessionWishlist();
            });
          }

        }]
    };
  });
