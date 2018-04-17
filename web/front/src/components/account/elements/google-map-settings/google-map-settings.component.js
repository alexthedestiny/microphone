'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('googleMapSettings').
  component('googleMapSettings', {
    template: require('./google-map-settings.template.html'),
    bindings: {
      location: '='
    },
    controller: ['$scope', 'Google', '$filter', '$log', '$timeout',
      function GoogleMapSettingsController($scope, Google, $filter, $log, $timeout) {
        var self = this;
        $scope.location = {};
        $scope.marker = {
          id: 1
        };
        $timeout(function() {
          $scope.marker.coords = self.location;
          $scope.map.center = $scope.location;
          $scope.marker.options = {
            draggable: true,
            icon:'/front/assets/images/map/map-mark.png'
          };
          $scope.marker.events = {
            dragend: function (marker, eventName, args) {
              $log.log('marker dragend');
              var lat = marker.getPosition().lat();
              var lon = marker.getPosition().lng();
              Google.setLogData({
                latitude: lat,
                longitude: lon
              });
            }
          };
          $scope.$apply();
        }, 5000);
        var styledArray = Google.getStyledArray();
        google.maps.visualRefresh = true;

        // $scope.selectedItem = $scope.sub_cat[0];
        $scope.selectedItem = null;
        $scope.searchField = function(item) {
          return true;
        };
        $scope.id_active_cat = 1;
        $scope.changeIdCat = function (id_cat) {
          $scope.id_cat = id_cat;
          return $scope.id_cat;
        };
        $scope.markers = [];

        Google.loadMarkers();
        $scope.$watch(
          Google.getMarkers,
          function(markers) {
            if(markers && markers.length) {
              for(var i = 0; i < markers.length; i++) {
                markers[i].events = {
                  dragend: function (marker) {
                    $scope.$apply(function () {
                      $scope.markers.latitude = marker.getPosition().lat().toFixed(5);
                      $scope.markers.longitude = marker.getPosition().lng().toFixed(5);
                    });
                  },
                  click: function (marker) {
                    $scope.$apply(function () {
                      $scope.markers.splice(marker.key, 1);
                    });
                  }
                };
              }
            }
          }
        );
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
            draggable : true,
            clickableIcons: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styledArray
          },
          center: { latitude: 50.450645, longitude: 30.523180 },
          zoom: 14,
          showWindow: false,
          addSFewMarkers: true,
          onClick: function (mapObj, event, eventArguments) {
            var lat = eventArguments[0].latLng.lat();
            var lon = eventArguments[0].latLng.lng();
            Google.setLogData({
              latitude: lat,
              longitude: lon
            });
            if(!$scope.map.addSFewMarkers) {
              $scope.marker = {};
            }
            // $timeout(function () {
            //   $scope.map.center = {
            //     latitude: eventArguments[0].latLng.lat(),
            //     longitude: eventArguments[0].latLng.lng(),
            //   };
            //   $scope.$apply();
            // }, 2000);
            $scope.marker = {
              id: 1,
              coords: {
                latitude: eventArguments[0].latLng.lat(),
                longitude: eventArguments[0].latLng.lng(),
              },
              showWindow: false,
              title: 'Marker - 1',
              opts: {
                draggable: true,
                icon:'/front/assets/images/map/map-mark.png'
              },
              events: {
                dragend: function (marker, eventName, args) {
                  $scope.$apply(function () {
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    Google.setLogData({
                      latitude: lat,
                      longitude: lon
                    });
                    $scope.map.center = {
                      latitude: lat,
                      longitude: lon
                    };
                  });
                },
                click: function (marker) {
                  // $scope.$apply(function () {
                  //   $scope.marker.id = marker.key;
                  //   for(var i = 0; i < $scope.markers.length; i++) {
                  //     if($scope.markers[i].id == marker.key) {
                  //       $scope.markers.splice(i, 1);
                  //     }
                  //   }
                  // });
                }
              }
            };
            // $scope.markers.push({
            //   id:$scope.markers.length + 1,
            //   latitude: eventArguments[0].latLng.lat(),
            //   longitude: eventArguments[0].latLng.lng(),
            //   showWindow: false,
            //   title: 'Marker - ' + $scope.markers.length + 1,
            //   opts: {
            //     draggable: true
            //   },
            //   events: {
            //     dragend: function (marker) {
            //       $scope.$apply(function () {
            //         $scope.markers.latitude = marker.getPosition().lat().toFixed(5);
            //         $scope.markers.longitude = marker.getPosition().lng().toFixed(5);
            //       });
            //     },
            //     click: function (marker) {
            //       $scope.$apply(function () {
            //         $scope.markers.id = marker.key;
            //         // console.dir($scope.markers.id);
            //         // console.dir(find($scope.markers, marker.key));
            //         for(var i = 0; i < $scope.markers.length; i++) {
            //           if($scope.markers[i].id == marker.key) {
            //             $scope.markers.splice(i, 1);
            //           }
            //         }
            //       });
            //     }
            //   }
            // });
            $scope.$apply();
          }
        };
      }
    ]
  });
