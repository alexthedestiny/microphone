'use strict';

angular.
  module('userAccountSettings')
  .directive('customOnChange', function() {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind('change', onChangeHandler);
      }
    };
  })
  .component('userAccountSettings', {
    template: require('./user-account-settings.template.html'),
    controller: ['$scope', '$timeout', '$document', '$rootScope', '$mdDialog', 'FileUploader', 'UserService', 'Main', 'Google',
      function clubSettingsController($scope, $timeout, $document, $rootScope, $mdDialog, FileUploader, UserService, Main, Google) {
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

        $scope.user = {};
        $scope.$watch(
          function() {
            return $rootScope.rootUser;
          },
          function(user) {
            if(angular.isDefined(user)) {
              $scope.user = user;
             
            }
          }
        );
        $scope.update = function(user) {          
          if(user.newPassword !== '' || user.newPasswordRepeat !== '') {
            if(user.newPassword !== user.newPasswordRepeat) {
              alert('Пароли не совпадают');
              return;
            }
          }
          user.data.location = Google.getLogData();
          
          UserService.UpdateUserData(user).then(function(response) {
            if(response.data === 1) {
              let alertSuccess = $mdDialog.alert({
                title: 'Поздравляем!',
                textContent: 'Ваши данные были успешно отредактированы',
                ok: 'Ок'
              });
              $mdDialog
                .show(alertSuccess)
                .finally(function() {
                  alertSuccess = undefined;
                  // UserService.loadRootUserById($scope.user.id);
                  $scope.user.newPassword = null;
                  $scope.user.newPasswordRepeat = null;
                  $scope.user.data.location = Google.getLogData();
                  $scope.uploaderAvatar.queue = [];
                });
            }
            else {
              let alertSuccess = $mdDialog.alert({
                title: 'Упс!',
                textContent: 'Кажется Вы не внесли никаких изменений',
                ok: 'Ок'
              });
              $mdDialog
                .show(alertSuccess)
                .finally(function() {
                  alertSuccess = undefined;
                });
            }
          });
        };
      }]});
