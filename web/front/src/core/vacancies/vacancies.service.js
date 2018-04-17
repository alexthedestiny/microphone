(function () {
  'use strict';

  angular
    .module('core.vacancy')
    .factory('VacancyService', VacancyService);

  VacancyService.$inject = ['$http', '$resource'];
  function VacancyService($http, $resource) {
    var self = this;
    self.vacancys = [];
    self.vacancyById = [];
    self.vacancyByUserId = [];
    self.userSessionId;
    var requestAllVacancies = $resource('/vacancy/getAllVacancies/', {}, {
      getAllVacancies: {
        method: 'post',
        isArray: true
      }
    });
    var requestGetVacanciesById = $resource('/vacancy/getVacanciesById/', {}, {
      getById: {
        method: 'post',
        isArray: false
      }
    });

    function LoadVacanciesById(idVacancy) {
      requestGetVacanciesById.getById({
        idVacancy: idVacancy
      }, function(data) {
        self.vacancyById = data;
      }, function(data) {
        console.log(data);
      });
    }

    function GetVacanciesById() {
      return self.vacancyById;
    }

    var service = {};
    service.CreateVacancy = CreateVacancy;
    service.RemoveVacancy = RemoveVacancy;
    service.LoadAllVacancies = LoadAllVacancies;
    service.GetAllVacancies = GetAllVacancies;
    service.LoadVacanciesById = LoadVacanciesById;
    service.GetVacanciesById = GetVacanciesById;
    service.UpdateVacancyData = UpdateVacancyData;

    return service;

    function CreateVacancy(vacancy) {
      return $http.post('/vacancy/create/', vacancy).then(handleSuccess, handleError('Error creating user'));
    }

    function RemoveVacancy(id) {
      return $http.post('/vacancy/removeVacancies/', {id: id}).then(handleSuccess, handleError('Error creating user'));
    }


    function LoadAllVacancies() {
      requestAllVacancies.getAllVacancies({
      },function(data) {
        self.vacancys = [];
        self.vacancys = self.vacancys.concat(data);
      });
    }

    function GetAllVacancies() {
      return self.vacancys;
    }

    function UpdateVacancyData(data) {
      return $http.put('/vacancy/updateVacancyData/', {data: data}).then(handleSuccess, handleError('Error updating user'));
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
