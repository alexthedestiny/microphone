'use strict';

angular.
module('addNewsPage')
.component('addNewsPage', {
  template: require('./add-news-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'NewsService', 'FileUploader',
  function AddNewsPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, NewsService, FileUploader) {
      $scope.news = {};
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
            }
            else {
              $rootScope.adminSession = 0;
              $scope.adminSession = undefined;
              $location.path('/admin/login');
            }
          }
        }
      );
      $scope.$watch(()=>{
        return Main.getNewsCategories();
      },(categories)=>{
        if(categories && categories.length>0){
          $scope.newsCategories = categories;
        }
      });
      //upload image start
      $scope.image = {
        originalImage: '',
        croppedImage: ''
      };
      var uploader = $scope.uploaderAvatar = new FileUploader({
        url: '/news/create/'
      });
      uploader.onAfterAddingFile = function(item) {
        var reader = new FileReader();
        reader.onload = function(event) {
          $scope.$apply(function(){
            $scope.image.originalImage = event.target.result;
          });
        };
        reader.readAsDataURL(item._file);
      };
      uploader.onBeforeUploadItem = function(item) {
        var blob = dataURItoBlob($scope.image.croppedImage);
        item._file = blob;
      };
      var dataURItoBlob = Main.dataURItoBlob;
      //upload image end

      $scope.addNews = ()=>{
        NewsService.CreateNews($scope.news).then((responce)=>{
          if(responce && responce.data == "1"){
            alert('Успешно добавлено');
          }
        });
      }

    }
  ]
});
