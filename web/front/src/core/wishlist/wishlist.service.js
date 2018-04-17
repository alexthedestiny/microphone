(function () {
  'use strict';

  angular
    .module('core.wishlist')
    .factory('WishlistService', WishlistService);

    WishlistService.$inject = ['$http', '$resource'];
  function WishlistService($http, $resource) {
    var self = this;
    var service = {};

    var requestGetSessionWishlist = $resource('/wishlist/getSessionWishlist/', {}, {
        getWishlist: {
          method: 'post',
          isArray: true
        }
      });
      var requestGetSessionWishlistProduct = $resource('wishlist/getSessionWishlistProducts', {}, {
          getWishlist: {
              method: 'post',
              isArray: true
          }
      });

      service.LoadSessionWishlist = LoadSessionWishlist;
      service.GetSessionWishlist = GetSessionWishlist;
      service.LoadSessionWishlistProduct = LoadSessionWishlistProduct;
      service.GetSessionWishlistProduct = GetSessionWishlistProduct;

      service.AddToWishlist = AddToWishlist;
     
      return service;
      
      function LoadSessionWishlist() {
        requestGetSessionWishlist.getWishlist({
        },function(data) {
          self.sessionWishlist = [];
          self.sessionWishlist = self.sessionWishlist.concat(data);
        });
      }
      function GetSessionWishlist() {
        return self.sessionWishlist;
      }
      function LoadSessionWishlistProduct() {
          requestGetSessionWishlistProduct.getWishlist({
          },function(data) {
              self.sessionWishlistProduct = [];
              self.sessionWishlistProduct = self.sessionWishlistProduct.concat(data);
          });
      }
      function GetSessionWishlistProduct() {
          return self.sessionWishlistProduct;
      }


      function AddToWishlist(id, count) {
        return $http.post('/wishlist/add', {id_product: id, count: count}).then(handleSuccess, handleError('Error creating user'));
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
