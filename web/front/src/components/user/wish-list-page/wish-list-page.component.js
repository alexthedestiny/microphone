'use strict';

angular.
module('wishListPage')
.component('wishListPage', {
  template: require('./wish-list-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'WishlistService',
  function catalogPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, WishlistService) {


      WishlistService.LoadSessionWishlistProduct();
      $scope.$watch(()=>{
          return WishlistService.GetSessionWishlistProduct();
      },(goods)=>{
          if(angular.isDefined(goods) && goods.length > 0){
              $scope.goods = goods;
          }
      });
  		
    }
  ]
});
