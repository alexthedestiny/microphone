(function () {
  'use strict';

  angular
    .module('core.product')
    .factory('ProductService', ProductService);

  ProductService.$inject = ['$http', '$resource'];
  function ProductService($http, $resource) {
    var self = this;
    self.products = [];
    self.product = [];
    self.stores = [];
    self.categories = [];
    self.brands = [];
   
    var requestAllProducts = $resource('/product/getAllProducts/', {}, {
      getAllProducts: {
        method: 'post',
        isArray: true
      }
    });

    var requestById = $resource('/product/getById/', {}, {
      getById: {
        method: 'post',
        isArray: false
      }
    });

    var requestGetStoresList = $resource('/product/getStoresList/', {}, {
      getStores: {
        method: 'post',
        isArray: true
      }
    });

    var requestGetCategories = $resource('/product/getCategories/', {}, {
      getCategories: {
        method: 'post',
        isArray: true
      }
    });

    var service = {};

    service.Create = Create;
    service.Update = Update;

    service.LoadAllProducts = LoadAllProducts;
    service.GetAllProducts = GetAllProducts;

    service.LoadProductById = LoadProductById;
    service.GetProductById = GetProductById;

    service.LoadStoresList = LoadStoresList;
    service.GetStoresList = GetStoresList;

    service.LoadCategories = LoadCategories;
    service.GetCategories = GetCategories;

    return service;

    function LoadAllProducts() {
      requestAllProducts.getAllProducts({
      },function(data) {
        self.products = [];
        self.products = self.products.concat(data);
      });
    }

    function GetAllProducts() {
      return self.products;
    }

    function LoadProductById(id) {
      requestById.getById({
        id: id
      }, function(data) {
        self.product = data;
      }, function(data) {
      });
    }

    function GetProductById() {
      return self.product;
    }

    function LoadStoresList() {
      requestGetStoresList.getStores({
      },function(data) {
        self.stores = [];
        self.stores = self.stores.concat(data);
      });
    }

    function GetStoresList() {
      return self.stores;
    }

    function LoadCategories() {
      requestGetCategories.getCategories({
      },function(data) {
        self.categories = [];
        self.categories = self.categories.concat(data);
      });
    }

    function GetCategories() {
      return self.categories;
    }

    function Create(product) {
      return $http.post('/product/add/', product).then(handleSuccess, handleError('Error creating user'));
    }

    function Update(product) {
      return $http.post('/product/edit/', product).then(handleSuccess, handleError('Error creating user'));
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
