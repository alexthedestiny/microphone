'use strict';

angular.
module('news')
.component('news', {
  template: require('./news.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'NewsService',
  function newsController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, NewsService) {
      if(!$scope.newsCategories){
        $scope.$watch(()=>{
          return Main.getNewsCategories();
        },(categories)=>{
          if(categories && categories.length>0){
            $scope.newsCategories = categories;
          }
        });
      }
  		NewsService.LoadAllNews();
  		$scope.$watch(()=>{
  			return NewsService.GetAllNews();
  		},(news)=>{
  			if( angular.isDefined(news) && news.length>0 ){
  				$scope.news = news;
          angular.forEach($scope.news,(object)=>{
            object.photoAddress = (object.photo!==null) ? '/uploads/news/images/'+object.photo : 'http://www.stablehands.org/wp-content/uploads/2014/03/blank-person-male.png';
            object.createdAt = moment(object.created_at).format("YYYY-MMM-DD HH:mm");
            object.categoryTitle = $scope.newsCategories.find( item => item.id == object.category ).title || 'Не указано';
          });
  			}
  		});

    }
  ]
});
