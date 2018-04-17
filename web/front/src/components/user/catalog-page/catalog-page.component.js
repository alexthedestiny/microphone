'use strict';

angular.
module('catalogPage')
.component('catalogPage', {
  template: require('./catalog-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'ProductService',
  function catalogPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, ProductService) {
  		ProductService.LoadAllProducts();
  		$scope.$watch(()=>{
  			return ProductService.GetAllProducts();
  		},(products)=>{
  			if(products && products.length>0){
          angular.forEach(products, (product)=>{
            product.photoAddres = (product.photo) ? '/uploads/catalog/images/'+product.photo : 'http://www.stablehands.org/wp-content/uploads/2014/03/blank-person-male.png'; 
          });
          $scope.products = products;
  			}
  		});
  		
    }
  ]
});
