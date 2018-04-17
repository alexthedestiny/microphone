'use strict';

angular.
module('newsPage')
.component('newsPage', {
  template: require('./news-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'NewsService',
  function newsPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, NewsService) {
      $scope.news = {};
  		$scope.$watch(()=>{
  			return Main.getNewsCategories();
  		},(categories)=>{
  			if(categories && categories.length>0){
  				$scope.newsCategories = categories;
  			}
  		});
  		if($stateParams.newsId){
  			$scope.newsId = $stateParams.newsId;
        NewsService.LoadNewsById($scope.newsId);
        $scope.$watch(()=>{
          return NewsService.GetNewsById();
        },(news)=>{
          if( angular.isDefined(news) && news.id == $scope.newsId ){
            $scope.news = news;
            $scope.news.categoryTitle = $scope.newsCategories.find( item => item.id == $scope.news.category ).title || 'Не указано';
            $scope.news.photoAddress = ($scope.news.photo!==null) ? '/uploads/news/images/'+$scope.news.photo : 'http://www.stablehands.org/wp-content/uploads/2014/03/blank-person-male.png';
          }
        });
  		}
    }
  ]
});
