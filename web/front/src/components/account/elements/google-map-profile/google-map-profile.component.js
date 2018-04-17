'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('googleMapProfile').
  component('googleMapProfile', {
    template: require('./google-map-profile.template.html'),
    bindings: {
      location: '='
    },
    controller: ['$scope', 'Google', '$filter', '$log', '$timeout',
      function GoogleMapProfileController($scope, Google, $filter, $log, $timeout) {
        var self = this;
        $scope.location = {};
        $scope.marker = {
          id: 1
        };
        $timeout(function(){
          $scope.location = self.location;
          $scope.marker.coords = self.location;
          $scope.marker.options = {
            draggable: false,
            icon:'/front/assets/images/map/map-mark.png'
          };
          $scope.map.center = self.location;
        }, 5000);
        var styledArray = Google.getStyledArray();
        $scope.selectedItem = null;
        $scope.searchField = function(item) {
          return true;
        };
        $scope.id_active_cat = 1;
        $scope.changeIdCat = function (id_cat) {
          $scope.id_cat = id_cat;
          return $scope.id_cat;
        };
        $scope.map = {
          control: {},
          options: {
            gestureHandling: 'auto',
            fullscreenControl: false,
            zoomControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            },
            scaleControl: true,
            scrollwheel: false,
            streetViewControl: true,
            draggable : false,
            clickableIcons: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styledArray
          },
          center: { latitude: 50.450645, longitude: 30.523180 },
          zoom: 14,
          showWindow: false,
          addSFewMarkers: true,
          onClick: function (mapObj, event, eventArguments) {
            if(!$scope.map.addSFewMarkers) {
              $scope.markers = [];
            }
            $scope.markers.push({
              id:$scope.markers.length + 1,
              latitude: eventArguments[0].latLng.lat(),
              longitude: eventArguments[0].latLng.lng(),
              showWindow: false,
              title: 'Marker - ' + $scope.markers.length + 1,
              opts: {
                draggable: true
              },
              events: {
                dragend: function (marker) {
                  $scope.$apply(function () {
                    $scope.markers.latitude = marker.getPosition().lat().toFixed(5);
                    $scope.markers.longitude = marker.getPosition().lng().toFixed(5);
                  });
                },
                click: function (marker) {
                  $scope.$apply(function () {
                    for(var i = 0; i < $scope.markers.length; i++) {
                      if($scope.markers[i].id == marker.key) {
                        $scope.markers.splice(i, 1);
                      }
                    }
                  });
                }
              }
            });
            $scope.$apply();
          }
        };
      }
    ]
  });
