'use strict';

angular.
module('storeAddressesPage')
.component('storeAddressesPage', {
  template: require('./store-addresses-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', '$state', 'StoreAddressesService',
  function storeAddressesController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, $state, StoreAddressesService) {
		 StoreAddressesService.LoadAddresses();
		$scope.$watch(()=>{
			return StoreAddressesService.GetAddresses();
			},(markers)=>{
				if(markers && markers.length>0){
				angular.forEach(markers, (marker)=>{
				if(marker.lat && marker.lng){
					addMarker({lat:parseFloat(marker.lat), lng:parseFloat(marker.lng)}, marker.id);
				}
			});
			}
		});

		$(document).ready(()=>{initMap()});

		var map;
		var markers = [];

		var infowindow = new google.maps.InfoWindow();

		  function initMap() {
			var haightAshbury = {lat: 50.4501, lng: 30.5234};

			map = new google.maps.Map(document.getElementById('store-map-user'), {
			  zoom: 12,
			  center: haightAshbury,
			  mapTypeId: 'terrain'
			});
		  }
		  function addMarker(location, id=null) {
			let marker = new google.maps.Marker({
			  position: location,
			  map: map,
			  content: 'content '+Math.ceil(Math.random()*100),
			  id: id
			});

			marker.addListener("click", function() {
			  infowindow.setContent(marker.content);
			  infowindow.open(map, marker);
			});  

			markers.push(marker);
		}
	}
  ]
});
