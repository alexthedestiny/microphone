'use strict';

angular.
module('adminStoreAddresses')
.component('adminStoreAddresses', {
  template: require('./admin-store-addresses.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'StoreAddressesService',
  function adminStoreAddresses($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, StoreAddressesService) {
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
              $location.path('/admin/login');
            }
          }
        }
      );
      $(document).ready(()=>{initMap()});

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

      var map;
      var markers = [];

      var infowindow = new google.maps.InfoWindow();

      function initMap() {
        var haightAshbury = {lat: 50.4501, lng: 30.5234};

        map = new google.maps.Map(document.getElementById('map-admin'), {
          zoom: 12,
          center: haightAshbury,
          mapTypeId: 'terrain'
        });

        map.addListener('click', function(event) {
          addMarker(event.latLng);
        });
      }
      function addMarker(location, id=null) {
        let marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable: true,
          content: 'content '+Math.ceil(Math.random()*100),
          removed: false,
          id: id
        });

        marker.addListener("dblclick", function() {
          marker.setMap(null);
          marker.removed = true;
        });

        marker.addListener("click", function() {
          infowindow.setContent(marker.content);
          infowindow.open(map, marker);
        });  

        markers.push(marker);
      }
      
      //end map markers
      $scope.save = ()=>{
        let markersClear = [];
        
        angular.forEach(markers, (marker)=>{
          let markerClear = {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
            content: marker.content,
            removed: (marker.removed) ? "1" : "0",
            id: ( angular.isDefined( marker.id ) ) ? marker.id : null
            // photo: ( angular.isDefined( marker.photo ) ) ? marker.photo : null
          }
          markersClear.push(markerClear);
        });
        StoreAddressesService.UpdateAddresses(markersClear).then((response)=>{
          if(response){
            markers = [];
            markersClear = [];
            StoreAddressesService.LoadAddresses();
            initMap();
          }
        });
      }
    

    }
  ]
});
