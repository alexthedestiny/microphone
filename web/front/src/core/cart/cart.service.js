(function () {
  'use strict';

  angular
    .module('core.cart')
    .factory('CartService', CartService);

    CartService.$inject = ['$http', '$resource'];
    function CartService($http, $resource) {
      var self = this;
      var service = {};

      var requestGetSessionCart = $resource('/cart/getSessionCart/', {}, {
        getCart: {
          method: 'post',
          isArray: true
        }
      });

        var requestGetSessionCartProduct = $resource('cart/getSessionCartProducts', {}, {
            getCart: {
                method: 'post',
                isArray: true
            }
        });


      service.LoadSessionCart = LoadSessionCart;
      service.GetSessionCart = GetSessionCart;

      service.LoadSessionCartProduct = LoadSessionCartProduct;
      service.GetSessionCartProduct = GetSessionCartProduct;

      service.AddToCart = AddToCart;
     
      return service;
      
      function LoadSessionCartProduct() {
        requestGetSessionCartProduct.getCart({
        },function(data) {
          self.sessionCartProduct = [];
          self.sessionCartProduct = self.sessionCartProduct.concat(data);
        });
      }
      function GetSessionCartProduct() {
        return self.sessionCartProduct;
      }
      function LoadSessionCart() {
          requestGetSessionCart.getCart({
          },function(data) {
              self.sessionCart = [];
              self.sessionCart = self.sessionCart.concat(data);
          });
      }
      function GetSessionCart() {
          return self.sessionCart;
      }
      function AddToCart(id, count) {
        return $http.post('/cart/add', {id_product: id, count: count}).then(handleSuccess, handleError('Error creating user'));
      }
     
      // private functions
      function handleSuccess(data) {
        return data;
      }

      function handleError(error) {
        return function () {
          return { success: false, message: error };
        };
      }

    }
  })();
