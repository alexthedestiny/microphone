'use strict';

angular.
module('indexPage')
.component('indexPage', {
  template: require('./index-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state', '$timeout',
  function IndexPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state, $timeout) {
		// $scope.location = {};
  //     	UserService.LoadUserLocation();
  //     	$timeout(()=>{
	 //      	$scope.$watch(()=>{
	 //        	return UserService.GetUserLocation();
	 //      	},(location)=>{
	 //        	if(location && location.latitude){
	 //          		$scope.location.latitude = location.latitude;
	 //          		$scope.location.longitude = location.longitude;
	 //         		var google_map_position = new google.maps.LatLng( location.latitude, location.longitude );
	 //          		var google_maps_geocoder = new google.maps.Geocoder();
	 //          		$timeout(()=>{
	 //            	google_maps_geocoder.geocode(
	 //              		{ 'latLng': google_map_position },
	 //              		function( results, status ) {
	 //              			console.log('results',results);
	 //                		$scope.location.city = results[0].address_components[4].long_name;
	 //                		console.log('$scope.location',$scope.location);
	 //                		if($scope.user && $scope.user.id){
	 //                  			UserService.UpdateUserLocation($scope.user.id, $scope.location);
	 //                		}
	 //              		}
	 //            	);
	 //          	},1000);
	 //        }
	 //      });
	 //    }, 500);
	  
    }
  ]
});
