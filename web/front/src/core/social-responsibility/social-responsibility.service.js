(function () {
  'use strict';

  angular
    .module('core.socialResponsibility')
    .factory('SocialResponsibilityService', SocialResponsibilityService);

  SocialResponsibilityService.$inject = ['$http', '$resource'];
  function SocialResponsibilityService($http, $resource) {
    var self = this;
    self.social = [];
    var request = $resource('/social/getSocial/', {}, {
      getSocial: {
        method: 'post',
        isArray: false
      }
    });

  
    var service = {};
    service.LoadSocial = LoadSocial;
    service.GetSocial = GetSocial;
    service.UpdateSocial = UpdateSocial;

    return service;

    function LoadSocial() {
      request.getSocial({
      },function(data) {
        self.social = data;
      });
    }

    function GetSocial() {
      return self.social;
    }

    function UpdateSocial(data) {
      return $http.put('/social/update/', {data: data}).then(handleSuccess, handleError('Error updating user'));
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
