'use strict';

angular.
  module('account').
  component('account', {
    template: require('./account.template.html'),
    controller: ['$translate', '$timeout', '$http', '$scope', '$rootScope', '$location', '$state', '$stateParams', 'UserService',
      function accountController($translate, $timeout, $http, $scope, $rootScope, $location, $state, $stateParams, UserService) {   
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
         
        $scope.openHeader = $stateParams.openHeader;
        // $scope.location = {};
        // UserService.LoadUserLocation();
        // $scope.$watch(()=>{
        //   return UserService.GetUserLocation();
        // },(location)=>{
        //   if(location && location.latitude){
        //     $scope.location.latitude = location.latitude;
        //     $scope.location.longitude = location.longitude;
        //     var google_map_position = new google.maps.LatLng( location.latitude, location.longitude );
        //     var google_maps_geocoder = new google.maps.Geocoder();
        //     $timeout(()=>{
        //       google_maps_geocoder.geocode(
        //         { 'latLng': google_map_position },
        //         function( results, status ) {
        //           $scope.location.city = results[0].address_components[4].long_name;
        //           console.log('$scope.location',$scope.location);
        //           if($scope.user && $scope.user.id){
        //             UserService.UpdateUserLocation($scope.user.id, $scope.location);
        //           }
        //         }
        //       );
        //     },1000);
        //   }
        // });
      } 
    ]
  });
