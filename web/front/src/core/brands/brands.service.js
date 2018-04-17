(function () {
  'use strict';

  angular
    .module('core.brands')
    .factory('BrandsService', BrandsService);

    BrandsService.$inject = ['$http', '$resource'];
  function BrandsService($http, $resource) {
    var self = this;
    self.brand;
    var service = {};

    var requestGetBrands = $resource('/brands/getBrands/', {}, {
      getBrands: {
        method: 'post',
        isArray: true
      }
    });

      var requestGetBrandById = $resource('/brands/getBrandById/', {}, {
          getBrand: {
              method: 'post',
              isArray: false
          }
      });

    service.CreateBrand = CreateBrand;
    service.LoadBrands = LoadBrands;
    service.GetBrands = GetBrands;
    service.DeleteBrand = DeleteBrand;
    service.GetBrandById = GetBrandById;
    service.LoadBrandById = LoadBrandById;
    service.EditBrand = EditBrand;

    return service;

    
    function LoadBrands() {
      requestGetBrands.getBrands({
      },function(data) {
        self.brands = [];
        self.brands = self.brands.concat(data);
      });
    }
    function GetBrands() {
      return self.brands;
    }
      function LoadBrandById(id) {
          requestGetBrandById.getBrand({
              id: id
          }, function(data) {
              self.brand = data;
          }, function(data) {
          });
      }
      function GetBrandById() {
          return self.brand;
      }

    function EditBrand(brand) {
      return $http.post('/brands/editBrand', brand).then(handleSuccess, handleError('Error creating user'));
    }

    function CreateBrand(brand) {
          return $http.post('/brands/addBrand', brand).then(handleSuccess, handleError('Error creating user'));
     }

    function DeleteBrand(brand) {
      return $http.post( 'brands/removeBrand', {id: brand.id} ).then(handleSuccess, handleError('Error creating user'));
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
