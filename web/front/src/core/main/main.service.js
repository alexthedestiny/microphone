'use strict';

angular.
  module('core.main').
  factory('Main', ['$resource',
    function($resource) {
      var self = this;
      /**
       * Converts data uri to Blob. Necessary for uploading.
       * @see
       *   http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
       * @param  {String} dataURI
       * @return {Blob}
       */
      self.dataURItoBlob = function(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mimeString});
      };

      self.newsCategories = [
        {
          id: 1,
          title: 'Категория 1'
        },
        {
          id: 2,
          title: 'Категория 2'
        },
        {
          id: 3,
          title: 'Категория 3'
        },
        {
          id: 4,
          title: 'Категория 4'
        }
      ];

      self.cities = [
        {
          id: 1,
          title: 'Київ'
        },
        {
          id: 2,
          title: 'Львів'
        },
        {
          id: 3,
          title: 'Одеса'
        },
        {
          id: 4,
          title: 'Рівне'
        }
      ];

      self.getNewsCategories = () => {
        return self.cities;
      }

      self.getCities = () => {
        return self.newsCategories;
      }


      return {
        dataURItoBlob: self.dataURItoBlob,
        getNewsCategories: self.getNewsCategories
      };
      
    }
  ]);
