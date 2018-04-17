(function () {
  'use strict';

  angular
    .module('core.cities')
    .factory('CitiesService', CitiesService);

    CitiesService.$inject = ['$http', '$resource'];
  function CitiesService($http, $resource) {
    var self = this;
    var service = {};

    var requestGetCities = $resource('/cities/getAll/', {}, {
      getCities: {
        method: 'post',
        isArray: true
      }
    });

    service.LoadCities = LoadCities;
    service.GetCities = GetCities;
   
    return service;
    
    function LoadCities() {
      requestGetCities.getCities({
      },function(data) {
        self.cities = [];
        self.cities = self.cities.concat(data);
      });
    }
    function GetCities() {
      return self.cities;
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
