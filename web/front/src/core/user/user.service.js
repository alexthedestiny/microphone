(function () {
  'use strict';

  angular
    .module('core.user')
    .factory('UserService', UserService);

  UserService.$inject = ['$http', '$resource'];
  function UserService($http, $resource) {
    var self = this;
    self.users = [];
    self.rootUsers = [];
    self.userSessionId;
    self.location = {};

    var service = {};
    service.Register = Register;
    service.RegisterSocial = RegisterSocial;
    service.LoginSocial = LoginSocial;
    service.LoadUserSessionId = LoadUserSessionId;
    service.GetUserSessionId = GetUserSessionId;
    service.GetUser = GetUser;
    service.GetByEmail = GetByEmail;

    service.UpdateUserData = UpdateUserData;

    service.loadUserById = loadUserById;
    service.getUserById = getUserById;
    service.loadRootUserById = loadRootUserById;
    service.getRootUserById = getRootUserById;

    service.PasswordRecovery = PasswordRecovery;

    service.LoadUserLocation = LoadUserLocation;
    service.GetUserLocation = GetUserLocation;
    service.UpdateUserLocation = UpdateUserLocation;

    var requestGetUserById = $resource('/user/getUserById', {}, {
      getUserById: {
        method: 'post',
        isArray: false
      }
    });

    function loadUserById(id_user) {
      requestGetUserById.getUserById({
        id: id_user
      }, function(data) {
        self.users = [];
        self.users = self.users.concat(data);
      });
    }
    function getUserById() {
      return self.users;
    }

    function loadRootUserById(id_user) {
      requestGetUserById.getUserById({
        id: id_user
      }, function(data) {
        self.rootUsers = [];
        self.rootUsers = data;
      });
    }
    function getRootUserById() {
      return self.rootUsers;
    }

    function LoadUserSessionId() {
      return $http.post('/user/getUserSessionId/')
        .then(function(data) {return self.userSessionId = data;},
          handleError('Error while getting UserSessionId')
        );
    }

    function GetUserSessionId() {
      return self.userSessionId;
    }

    return service;

    function GetByEmail(email,password) {
        return $http.post('/user/loginAjax/', {email: email, password: password}).then(handleSuccess, handleError('Error getting user by email'));
    }
    function LoginSocial(social_id){
        return $http.post('/user/loginSocial/', {social_id: social_id}).then(handleSuccess, handleError('Error getting user by email'));
    }

    function Register(name, lastname, login, email, password) {
      return $http.post('/user/registerAjax/', {name: name, lastname: lastname, login:login, email: email, password: password}).then(handleSuccess, handleError('Error while registering'));
    }
    function RegisterSocial(typeSocial, social_id, name, email, photo) {
      return $http.post('/user/registerSocial/', {typeSocial:typeSocial, social_id: social_id, name: name, email: email, photo: photo}).then(handleSuccess, handleError('Error while registering'));
    }

    function GetUser(id) {
      return $http.post('/user/getUserById/', {id: id})
        .then(handleSuccess, handleError('Error while getting User By id'));
    }

    function UpdateUserData(data) {
      return $http.put('/user/updateUserData/', {data: data}).then(handleSuccess, handleError('Error updating user'));
    }

    function PasswordRecovery(email){ 
      return $http.post('/user/passwordRecovery/', {email: email}).then(handleSuccess, handleError('Error getting user by email'));
    }

    function LoadUserLocation(){ 
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          self.location = position.coords;
        });
      }else{
        self.location = {};
      }
    }

    function GetUserLocation(){ 
      return self.location;
    }

    function UpdateUserLocation(id_user, location){
       return $http.post('/user/updateUserLocation/', {id_user: id_user, location:location}).then(handleSuccess, handleError('Error getting user by email'));
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
    }

})();
