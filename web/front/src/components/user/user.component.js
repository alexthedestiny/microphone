'use strict';

angular.
  module('user').
  component('user', {
    template: require('./user.template.html'),
    controller: ['$translate', '$timeout', '$scope', '$http', '$rootScope', '$filter', '$state', '$stateParams', 'UserService', 'AdminService', '$location',
      function UserComponentController($translate, $timeout, $scope, $http, $rootScope, $filter, $state, $stateParams, UserService, AdminService, $location) {
        $scope.openHeader = $stateParams.openHeader;
        $scope.location = {};
        UserService.LoadUserSessionId();
        $scope.$watch(
          UserService.GetUserSessionId,
          function(userSession) {
            if(userSession){
              if(userSession && userSession.data > 0) {
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
                $scope.user = undefined;
              }
            }
          }
        );

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
              }
            }
          }
        );
        // $timeout(()=>{
        //   UserService.LoadUserLocation();
        //   $scope.$watch(()=>{
        //     return UserService.GetUserLocation();
        //   },(location)=>{
        //     if(location && location.latitude){
        //       $scope.location.latitude = location.latitude;
        //       $scope.location.longitude = location.longitude;
        //       var google_map_position = new google.maps.LatLng( location.latitude, location.longitude );
        //       var google_maps_geocoder = new google.maps.Geocoder();
        //       $timeout(()=>{
        //         google_maps_geocoder.geocode(
        //           { 'latLng': google_map_position },
        //           function( results, status ) {
        //             $scope.location.city = results[0].address_components[4].long_name;
        //             console.log('$scope.location',$scope.location);
        //             if($scope.user && $scope.user.id){
        //               UserService.UpdateUserLocation($scope.user.id, $scope.location);
        //             }
        //           }
        //         );
        //       },1000);
        //     }
        //   });
        // }, 500);
        

      }
    ]
  });
