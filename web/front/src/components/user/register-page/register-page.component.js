'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('registerPage').
component('registerPageComponent', {
  template: require('./register-page.template.html'),
  controller: ['$scope', '$state', '$rootScope', 'AuthenticationService', '$location', '$stateParams', '$mdDialog',
  function RegisterPageController($scope, $state, $rootScope, AuthenticationService, $location, $stateParams, $mdDialog) {  
    // $scope.user = {};
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
    var vm = this;

$scope.register = function(user) {
  if($scope.user.name && $scope.user.lastname && $scope.user.email && $scope.user.password && $scope.user.passwordRepeat) {
    if(user.password !== user.passwordRepeat) {
      alert('пароли не совпадают');
      user.password = null;
      user.passwordRepeat = null;
      return;
    }
    AuthenticationService.Register(user.name, user.lastname, user.login, user.email, user.password, function (response) {
      if(response.userReg){
         let alertSuccess = $mdDialog.alert({
            title: 'Упс!',
            textContent: 'Пользователь с таким login или Email уже зарегистирован!',
            ok: 'Ок'
          });
          $mdDialog
          .show(alertSuccess)
          .finally(function() {
            alertSuccess = undefined;
          });
      }else{
        if (response.success) {
          AuthenticationService.SetCredentials(user.email, user.password);
          // $location.path('/account/'+response.id);
          $state.go('account.profile', {userId: response.id});
        }
        else {
          alert('Ой');
        }
      }
    });
  }else{
    alert('Поля пустые');
  }
};
}
]
});
