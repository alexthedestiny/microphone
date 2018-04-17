'use strict';

angular.
module('cartPage')
.component('cartPage', {
  template: require('./cart-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'CartService', 'FileUploader',
  function adminBrandController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location,  CartService, FileUploader) {
  		// if(!$rootScope.adminSession) {
      //   AdminService.LoadAdminSessionId();
      // }
      //
      CartService.LoadSessionCartProduct();
      $scope.$watch(()=>{
          return CartService.GetSessionCartProduct();
      },(goods)=>{
          if(angular.isDefined(goods) && goods.length > 0){
              $scope.goods = goods;
          }
      });
    }
  ]
});
