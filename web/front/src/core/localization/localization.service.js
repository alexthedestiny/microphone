(function () {
  'use strict';

  angular
    .module('core.localization')
    .factory('LocalizationService', LocalizationService);

    LocalizationService.$inject = ['$http', '$resource'];
  function LocalizationService($http, $resource) {
    var self = this;
    self.language = {};

    var service = {};

    var requestGetLanguage = $resource('/language/getLanguage/', {}, {
      getLanguage: {
        method: 'post',
        isArray: false
      }
    });
    
    service.SetLanguage = SetLanguage;

    service.LoadLanguage = LoadLanguage;
    service.GetLanguage = GetLanguage;
   
    return service;
    
    function LoadLanguage() {
      requestGetLanguage.getLanguage({
      },function(data) {
        self.language = {};
        self.language = data;
      });
    }
    function GetLanguage() {
      return self.language;
    }

    function SetLanguage(key) {
      return $http.post('/language/setLanguage', {key: key}).then(handleSuccess, handleError('Error creating user'));
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
