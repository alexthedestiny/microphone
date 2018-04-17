(function () {
  'use strict';

  angular
    .module('core.about')
    .factory('AboutService', AboutService);

  AboutService.$inject = ['$http', '$resource'];
  function AboutService($http, $resource) {
    var self = this;
    self.about = [];
    var request = $resource('/about/getAbout/', {}, {
      getAbout: {
        method: 'post',
        isArray: false
      }
    });

  
    var service = {};
    service.LoadAbout = LoadAbout;
    service.GetAbout = GetAbout;
    service.UpdateAbout = UpdateAbout;

    return service;

    function LoadAbout() {
      request.getAbout({
      },function(data) {
        self.about = data;
      });
    }

    function GetAbout() {
      return self.about;
    }

    function UpdateAbout(data) {
      return $http.put('/about/update/', {data: data}).then(handleSuccess, handleError('Error updating user'));
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


    function handleError(error) {
      return function () {
        return { success: false, message: error };
      };
    }
  }
})();
