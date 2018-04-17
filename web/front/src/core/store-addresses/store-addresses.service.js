(function () {
  'use strict';

  angular
    .module('core.storeAddresses')
    .factory('StoreAddressesService', StoreAddressesService);

  StoreAddressesService.$inject = ['$http', '$resource'];
  function StoreAddressesService($http, $resource) {
    var self = this;
    self.storeMarkers = [];
    var request = $resource('/stores/getAddresses/', {}, {
      getAddresses: {
        method: 'post',
        isArray: true
      }
    });

  
    var service = {};
    service.LoadAddresses = LoadAddresses;
    service.GetAddresses = GetAddresses;
    service.UpdateAddresses = UpdateAddresses;

    return service;

    function LoadAddresses() {
      request.getAddresses({
      },function(data) {
        self.storeMarkers = data;
      });
    }

    function GetAddresses() {
      return self.storeMarkers;
    }

    function UpdateAddresses(data) {
      return $http.post('/stores/update/', {data: data}).then(handleSuccess, handleError('Error updating user'));
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
