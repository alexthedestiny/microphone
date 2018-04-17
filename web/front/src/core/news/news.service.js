(function () {
  'use strict';

  angular
    .module('core.news')
    .factory('NewsService', NewsService);

  NewsService.$inject = ['$http', '$resource'];
  function NewsService($http, $resource) {
    var self = this;
    self.newss = [];
    self.newsById = [];
    self.newsByUserId = [];
    self.userSessionId;
    self.nLastNews = [];
    self.nLastNewsFooter = [];
    self.newsByCategory = [];
    var requestAllNews = $resource('/news/getAllNews/', {}, {
      getAllNews: {
        method: 'post',
        isArray: true
      }
    });
    var requestGetNewsById = $resource('/news/getNewsById/', {}, {
      getById: {
        method: 'post',
        isArray: false
      }
    });

    var requestGetNewsByCategory = $resource('/news/newsByCat/', {}, {
      getByCat: {
        method: 'post',
        isArray: false
      }
    });

    var requestGetNLastNews = $resource('/news/getNLastNews/', {}, {
      getNNews: {
        method: 'post',
        isArray: true
      }
    });
    var requestGetNLastNewsFooter = $resource('/news/getNLastNews/', {}, {
      getNNewsFooter: {
        method: 'post',
        isArray: true
      }
    });

    function LoadNewsById(idNews) {
      requestGetNewsById.getById({
        idNews: idNews
      }, function(data) {
        self.newsById = data;
      }, function(data) {
      });
    }

    function GetNewsById() {
      return self.newsById;
    }

    function LoadNewsByСategory(id, page=1, itemsInPage) {
      requestGetNewsByCategory.getByCat({
        id: id,
        page: page,
        itemsInPage: itemsInPage
      }, function(data) {
        self.newsByCategory = data;
      }, function(data) {
      });
    }
    function GetNewsByCategory() {
      return self.newsByCategory;
    }

    function LoadNLastNews(n) {
      requestGetNLastNews.getNNews({
        n: n
      }, function(data) {
        self.nLastNews = data;
      }, function(data) {
      });
    }
    function GetNLastNews() {
      return self.nLastNews;
    }

    function LoadNLastNewsFooter(n) {
      requestGetNLastNewsFooter.getNNewsFooter({
        n: n
      }, function(data) {
        self.nLastNewsFooter = data;
      }, function(data) {
      });
    }
    function GetNLastNewsFooter() {
      return self.nLastNewsFooter;
    }


    var service = {};
    service.CreateNews = CreateNews;
    service.RemoveNews = RemoveNews;
    service.LoadAllNews = LoadAllNews;
    service.GetAllNews = GetAllNews;
    service.LoadNewsById = LoadNewsById;
    service.GetNewsById = GetNewsById;
    service.UpdateNewsData = UpdateNewsData;
    service.LoadNLastNews = LoadNLastNews;
    service.GetNLastNews = GetNLastNews;
    service.LoadNLastNewsFooter = LoadNLastNewsFooter;
    service.GetNLastNewsFooter = GetNLastNewsFooter;

    service.LoadNewsByСategory = LoadNewsByСategory;
    service.GetNewsByCategory = GetNewsByCategory;

    return service;

    function CreateNews(news) {
      return $http.post('/news/create/', news).then(handleSuccess, handleError('Error creating user'));
    }

    function LoadAllNews() {
      requestAllNews.getAllNews({
      },function(data) {
        self.newss = [];
        self.newss = self.newss.concat(data);
      });
    }

    function GetAllNews() {
      return self.newss;
    }

    function UpdateNewsData(data) {
      return $http.put('/news/updateNewsData/', {data: data}).then(handleSuccess, handleError('Error updating user'));
    }

    function RemoveNews(id) {
      return $http.post('/news/removeNews/', {id: id}).then(handleSuccess, handleError('Error updating user'));
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
