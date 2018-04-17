'use strict';

angular.
module('adminNews')
.component('adminNews', {
  template: require('./admin-news.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'NewsService',
  function adminNewsController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, NewsService) {
  		if(!$rootScope.adminSession) {
          AdminService.LoadAdminSessionId();
        }
        $scope.$watch(
          AdminService.GetAdminSessionId,
          function(adminSession) {
            if(adminSession){
              if(adminSession && adminSession.data > 0) {
                $rootScope.adminSession = adminSession.data;
                $scope.adminSession = adminSession.data;
                NewsService.LoadAllNews();
                $scope.$watch(()=>{
                  return NewsService.GetAllNews();
                },(news)=>{
                  if( angular.isDefined(news) && news.length>0 ){
                    $scope.news = news;
                  }
                });
              }
              else {
                $rootScope.adminSession = 0;
                $scope.adminSession = undefined;
                $location.path('/admin/login');
              }
            }
          }
        );

        $scope.removeNews = (id) => {
          NewsService.RemoveNews(id).then(()=>{
            NewsService.LoadAllNews();
          });
        }
    }
  ]
});
