(function () {
  'use strict';

  angular
    .module('core.public')
    .factory('PublicService', PublicService);

  PublicService.$inject = ['$http', '$resource'];
  function PublicService($http, $resource) {
    var self = this;
    self.public = [];
    var request = $resource('/public/getPublic/', {}, {
      getPublic: {
        method: 'post',
        isArray: false
      }
    });

  
    var service = {};
    service.LoadPublic = LoadPublic;
    service.GetPublic = GetPublic;
    service.UpdatePublic = UpdatePublic;

    return service;

    function LoadPublic() {
      request.getPublic({
      },function(data) {
        self.public = data;
      });
    }

    function GetPublic() {
      return self.public;
    }

    function UpdatePublic(data) {
      return $http.put('/public/update/', {data: data}).then(handleSuccess, handleError('Error updating user'));
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
