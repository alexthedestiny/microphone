(function () {
  'use strict';
  angular
    .module('core.authentication')
    .factory('AuthenticationService', AuthenticationService);
  AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService', '$state'];
  function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService, $state) {
    var service = {};
    service.Login = Login;
    service.LoginSocial = LoginSocial;
    service.Logout = Logout;
    service.Register = Register;
    service.RegisterSocial = RegisterSocial;
    service.SetCredentials = SetCredentials;
    service.ClearCredentials = ClearCredentials;
    service.ClearSocial = ClearSocial;
    service.PasswordRecovery = PasswordRecovery;
    return service;

    function Login(email, password, callback) {
      $timeout(function () {
        var response;
        UserService.GetByEmail(email,password)
          .then(function (user) {
            if (angular.isDefined(user.data) && angular.isDefined(user.data.id)) {
              response = {
                success: true,
                data: user.data
              };
              $rootScope.userSession = user.data.id;
            } else {
              response = { success: false, message: 'Username or password is incorrect' };
            }
            callback(response);
          });
      }, 1000);
    }

    function LoginSocial(social_id, callback){
      $timeout(function () {
        var response;
        UserService.LoginSocial(social_id)
          .then(function (user) {
            if (user.data !== null && user.data != undefined) {
              response = {
                success: true,
                data: user.data
              };
            } else {
              response = { success: false, message: 'redirect to register by google' };
            }
            callback(response);
          });
      }, 1000);
    }
    function Logout(id) {
      $http({
        method: 'POST',
        url: '/user/logout/'
      }).then(function successCallback(response) {
        ClearSocial(id);
        ClearCredentials();
        $rootScope.userSession = 0;
        UserService.LoadUserSessionId();
        $state.go('user.login');
      }, function errorCallback(response) {
        console.log('Error while logging out');
      });
    }

    function Register(name, lastname, login, email, password, callback) {
      $timeout(function () {
        var response;
        UserService.Register(name, lastname, login, email, password)
          .then(function (user) {
            if (typeof user.data == 'string' && parseInt(user.data) > 0) {
              response = { success: true, id: user.data};
              $rootScope.userSession = user.data;
            } else if(!user.data){
              response = { success: false, userReg: true};
            }else {
              response = { success: false, message: 'Error while registering'};
            }

            callback(response);
          });
      }, 1000);
    }
    function RegisterSocial(typeSocial, socialId, name, email, photo, callback) {
      $timeout(function () {
        var response;
        UserService.RegisterSocial(typeSocial, socialId, name, email, photo)
          .then(function (user) {
            if (typeof user.data == 'string' && parseInt(user.data) > 0) {
              response = { success: true, id: user.data };
              $rootScope.userSession = user.data;
            } else {
              response = { success: false, message: 'Error while registering' };
            }
            callback(response);
          });
      }, 1000);
    }

    function SetCredentials(username, password) {
      var authdata = Base64.encode(username + ':' + password);
      $rootScope.globals = {
        currentUser: {
          username: username,
          authdata: authdata
        }
      };
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
      $cookieStore.put('globals', $rootScope.globals);
    }

    function ClearCredentials() {
      $rootScope.globals = {};
      $rootScope.userSession = 0;
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }

    function ClearSocial(id) {
      $http({
        method: 'POST',
        data: {
          userId: id
        },
        url: '/user/getSocialId/'
      }).then(function successCallback(response) {
          let userData = response.data[0];         
          if(userData.fb_id == 0 &&  userData.google_id == 0){
            return;
          }else if(userData.fb_id){
            FB.logout(function(response) {
              //console.log(response.status);
            });
          }else if(userData.google_id){
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              // console.log(auth2);
            });
          }
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

    function PasswordRecovery(email, callback){
        $timeout(function () {
        var response;
        UserService.PasswordRecovery(email)
          .then(function (res) {
            //console.log(res);
            response = res;
            
            callback(response);
          });
      }, 1000);
    }
    
  }

  // Base64 encoding service used by AuthenticationService
  var Base64 = {
    keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    encode: function (input) {
      var output = '';
      var chr1, chr2, chr3 = '';
      var enc1, enc2, enc3, enc4 = '';
      var i = 0;

      do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
            this.keyStr.charAt(enc1) +
            this.keyStr.charAt(enc2) +
            this.keyStr.charAt(enc3) +
            this.keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
      } while (i < input.length);
      return output;
    },

    decode: function (input) {
      var output = '';
      var chr1, chr2, chr3 = '';
      var enc1, enc2, enc3, enc4 = '';
      var i = 0;

      // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
      var base64test = /[^A-Za-z0-9\+\/\=]/g;
      if (base64test.exec(input)) {
        window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
      }
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      do {
        enc1 = this.keyStr.indexOf(input.charAt(i++));
        enc2 = this.keyStr.indexOf(input.charAt(i++));
        enc3 = this.keyStr.indexOf(input.charAt(i++));
        enc4 = this.keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
        chr1 = chr2 = chr3 = '';
        enc1 = enc2 = enc3 = enc4 = '';
      } while (i < input.length);
      return output;
    }
  };
})();
