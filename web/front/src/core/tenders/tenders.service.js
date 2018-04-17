(function () {
  'use strict';

  angular
    .module('core.tenders')
    .factory('TendersService', TendersService);

  TendersService.$inject = ['$http', '$resource'];
  function TendersService($http, $resource) {
    var self = this;
    self.tenders = [];
    self.tendersById = [];
    var requestAllTenders = $resource('/tenders/getAllTenders/', {}, {
      getAllTenders: {
        method: 'post',
        isArray: true
      }
    });
    var requestGetTendersById = $resource('/tenders/getTendersById/', {}, {
      getById: {
        method: 'post',
        isArray: false
      }
    });

    function LoadTendersById(id) {
      requestGetTendersById.getById({
        id: id
      }, function(data) {
        self.tendersById = data;
      }, function(data) {
        console.log(data);
      });
    }

    function GetTendersById() {
      return self.tendersById;
    }

    var service = {};
    service.CreateTender = CreateTender;
    service.RemoveTender = RemoveTender;
    service.LoadAllTenders = LoadAllTenders;
    service.GetAllTenders = GetAllTenders;
    service.LoadTendersById = LoadTendersById;
    service.GetTendersById = GetTendersById;
    service.UpdateTenderData = UpdateTenderData;

    return service;

    function CreateTender(tenders) {
      return $http.post('/tenders/create/', tenders).then(handleSuccess, handleError('Error creating user'));
    }

    function RemoveTender(id) {
      return $http.post('/tenders/removeTenders/', {id: id}).then(handleSuccess, handleError('Error creating user'));
    }


    function LoadAllTenders() {
      requestAllTenders.getAllTenders({
      },function(data) {
        self.tenders = [];
        self.tenders = self.tenders.concat(data);
      });
    }

    function GetAllTenders() {
      return self.tenders;
    }

    function UpdateTenderData(data) {
      return $http.put('/tenders/updateTendersData/', {data: data}).then(handleSuccess, handleError('Error updating user'));
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
