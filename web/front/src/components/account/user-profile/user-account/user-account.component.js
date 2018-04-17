'use strict';

angular.
  module('userAccount')
  .component('userAccount', {
    template: require('./user-account.template.html'),
    controller: ['$scope', '$rootScope', '$mdDialog', '$stateParams','Main', 'UserService', '$timeout', 'CitiesService', 'FileUploader',
      function userAccountController($scope, $rootScope, $mdDialog, $stateParams, Main, UserService, $timeout, CitiesService, FileUploader) {
        UserService.LoadUserSessionId();
        $scope.$watch(
          UserService.GetUserSessionId,
          function(userSession) {
            if(userSession){
              if(userSession && parseInt(userSession.data) > 0) {
                $rootScope.userSession = userSession.data;
                UserService.loadUserById($rootScope.userSession);
                $scope.$watch(()=>{
                  return UserService.getUserById();
                },(user)=>{
                  if(user && user.length>0 && user[0].id == $rootScope.userSession){
                    $scope.user = user[0];
                  }
                });
              }
              else {
                $rootScope.userSession = 0;
                $scope.user = {};
              }
            }
          }
        );

        CitiesService.LoadCities();
        $scope.$watch(()=>{
          return CitiesService.GetCities();
        },(cities)=>{
          if(cities && cities.length>0){
            $scope.cities = cities;
          }
        });

        $scope.image = {
          originalImage: '',
          croppedImage: ''
        };
        var uploader = $scope.uploaderAvatar = new FileUploader({
          url: '/user/updateUserData/'
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
        $scope.$watch(
          Main.getCities,
          function(cities) {
            if(cities && cities.length) {
              $scope.cities = cities;
            }
          }
        );
        
        $scope.save = () => {
          UserService.UpdateUserData($scope.user);
        }
        // $scope.$watch(function(){
        //   return $rootScope.userSession;
        // },function(userSession){
        //   console.log('userSession',userSession);
        //   if(userSession){
        //     UserService.loadUserById(userSession);
        //     $scope.$watch(()=>{
        //       return UserService.getUserById();
        //     },(user)=>{
        //       if(user && user.length>0 && user[0].id == userSession){
        //         $scope.user = user[0];
        //       }
        //     });
        //   }
        // });

      }
      ]});
