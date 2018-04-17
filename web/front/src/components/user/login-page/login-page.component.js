'use strict';

angular.
module('loginPage').
component('loginPageComponent', {
  template: require('./login-page.template.html'),
  controller: ['$scope', 'AuthenticationService', '$state', '$mdDialog', 'UserService',
  function LoginPageController($scope, AuthenticationService, $state, $mdDialog, UserService) {

   var vm = this;
  $scope.googleAuth = function() {
      gapi.load('auth2', function() {
        var auth2 = gapi.auth2.init({
          client_id: '866472101586-stvnevch8n6kihkv5k7asj2ejlusd2tl.apps.googleusercontent.com',
          fetch_basic_profile: true,
          approvalprompt:'force',
          cookiepolicy : 'single_host_origin',
          scope: 'profile email'
        });
        auth2.signIn().then(function() {
           AuthenticationService.LoginSocial(auth2.currentUser.get().getBasicProfile().getId(), function(res){
            if(!res.success) {
              AuthenticationService.RegisterSocial(
                1,
                auth2.currentUser.get().getBasicProfile().getId(),
                auth2.currentUser.get().getBasicProfile().getName(),
                auth2.currentUser.get().getBasicProfile().getEmail(),
                auth2.currentUser.get().getBasicProfile().getImageUrl(),
                function (response) {
                  if (response.success) {
                    AuthenticationService.SetCredentials(auth2.currentUser.get().getBasicProfile().getEmail(),
                      auth2.currentUser.get().getBasicProfile().getId());
                    $rootScope.userSession = response.id;

                    $state.go('account.profile', {userId: response.id});
                  }
                  else {
                    FlashService.Error(response.message);
                    vm.error = response.message;
                    vm.dataLoading = false;
                  }
                });
            }else{
              AuthenticationService.SetCredentials(auth2.currentUser.get().getBasicProfile().getEmail(), res.data);
              $state.go('account.profile', {userId: res.data});
            }
          });
        });
      });
    };
    $scope.fbAuth = function() {
      FB.login(function(response) {
      if (response.status === 'connected') {
        var status = response.status;
        FB.api('/me?fields=email,name,last_name,picture', { access_token: response.authResponse.accessToken }, function(response) {
          var email = null;
          if(response.email !== undefined) {
            email = response.email;
          }
          else {
            email = null;
          }
           AuthenticationService.LoginSocial(response.id, function(res){
            if(!res.success){
              AuthenticationService.RegisterSocial(
                2,
                response.id,
                response.name,
                email,
                response.picture.data.url,
                function (response) {
                if (response.success) {
                  AuthenticationService.SetCredentials(email, response.id);
                  $rootScope.userSession = response.id;

                  $state.go('account.profile', {userId: response.id});
                  }
                  else {
                    FlashService.Error(response.message);
                    vm.error = response.message;
                    vm.dataLoading = false;
                  }
                }
              );
            }else{
              AuthenticationService.SetCredentials(email, res.data);
              $state.go('account.profile', {userId: res.data});
            }
          });
        });
      }
      },{scope:'email,public_profile'});
    };

  $scope.passwordRecovery = function(ev) {
    var emailInput = $mdDialog.prompt()
      .title('Восстановление пароля?')
      .textContent('Для продолжения введите ваш email')
      .placeholder('email')
      .ariaLabel('email')
      .targetEvent(ev)
      .ok('Подтвердить')
      .cancel('Отменить');

    $mdDialog.show(emailInput).then(function(result) {
        AuthenticationService.PasswordRecovery(result, function(response){
          if(response.data) {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('')
                .textContent(`Новый пароль отправлен на ${result}`)
                .ok('OK')
                .targetEvent(ev)
            );
          }else{
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('')
                .textContent(`Пользователь с таким email не зарегистрирован`)
                .ok('OK')
                .targetEvent(ev)
            );
         }
      });
    }, function() {
      //cancel press
    });
  };

  $scope.login = login;
  (function initController() {
    AuthenticationService.ClearCredentials();
  })();

  function login() {
    vm.dataLoading = true;
    AuthenticationService.Login($scope.email, $scope.password, function (response) {
      if (response.success) {
        $state.go('account.profile', {userId: response.data.id});
       } else {
       alert('wrong pass');
      };
    });
  }

}
    ]
  });
