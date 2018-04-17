'use strict';

angular.
module('productPage')
.component('productPage', {
  template: require('./product-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'ProductService',
  function productPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, ProductService) {
  		if($stateParams.productId){
  			$scope.productId = $stateParams.productId;
  			ProductService.LoadProductById($scope.productId);
	  		$scope.$watch(()=>{
	  			return ProductService.GetProductById();
	  		},(product)=>{
	  			if( product && product.id == $stateParams.productId ){
            if(product.gallery && product.gallery.length>0){
              product.galleryAddresses = [];
              angular.forEach(product.gallery,(galleryPhoto)=>{
                product.galleryAddresses.push('/uploads/catalog/images/gallery/'+galleryPhoto);
              });
            }
            product.photoAddres = (product.photo) ? "/uploads/catalog/images/"+product.photo : 'http://www.stablehands.org/wp-content/uploads/2014/03/blank-person-male.png'; 
          	$scope.product = product;
	  			}
	  		});
  		}
    }
  ]
});
