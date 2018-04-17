'use strict';

angular.
  module('core.google').
  factory('Google', ['$resource',
    function($resource) {
      var self = this;
      self.markers = [];
      self.location = {};
      self.getLogData = function() {
        return self.location;
      }
      self.setLogData = function(location) {
        self.location = location;
      }
      var request = $resource('/catalog/google-map', {}, {
          getMarkers: {
              method: 'post',
              /*params: {
                  action: 'catalog/google-map/'
              },*/
              isArray: false
          }
      });
      var loadMarkers = function() {
          request.getMarkers({}, function(data) {

              self.markers = self.markers.concat(data);
          })
      };
      var getMarkers = function() {
          return self.markers;
      };
      var getStyledArray = function() {
        return [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "2.00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#9c9c9c"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7b7b7b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c8d7d4"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#070707"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ];
      }

      /*
      var loadMovies = function(searchString, page) {

          request.search({
              s: searchString || 'Iron man',
              page: page || 1
          }, function(responce) {
              if(responce.Response == 'True') {
                  self.movies = responce.Search;
                  self.totalResults = responce.totalResults;
              }
          });
      };
      var loadDetailsSearch = function(idMovie) {
          request.search({
              i: idMovie
          }, function(responce) {
              if(responce.Response == 'True') {
                  self.detailsMovie.push(responce);
              }
          });
      };
      var getMovies = function() {
        return self.movies;
      };
      var getMovieDetails = function(id) {
          for(var i = 0; i < self.detailsMovie.length; i++) {
            if(self.detailsMovie[i].imdbID == id) {
              return self.detailsMovie[i];
            }
          }
          return null;
      };
      var getTotalResults = function() {
        return self.totalResults;
      };
      */

      return {
          request: request,
          loadMarkers: loadMarkers,
          getMarkers: getMarkers,
          getLogData: self.getLogData,
          setLogData: self.setLogData,
          getStyledArray: getStyledArray
      };

    }
  ]);
