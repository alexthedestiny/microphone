'use strict';

// Define the `indexPage` module
angular.module('googleMapProfile', [
    'uiGmapgoogle-maps',
    'core.google'
])
    .filter('customSearchPlaces',[function(){
        return function(data,f){
            var output = [];
            if(!!f){
                for(var i = 0;i<data.length; i++){
                    if(data[i].title.toLowerCase().indexOf(f.toLowerCase()) !== -1 || data[i].description.toLowerCase().indexOf(f.toLowerCase()) !== -1){
                        output.push(data[i]);
                    }
                }
            }
            else {
                output = data;
            }
            return output;
        }
    }])
    .filter('sortByIdCat',[function(){
        return function(data,id_cat){
            var output = [];
            if(id_cat != null){
                for(var i = 0;i<data.length; i++){
                    if(data[i].id_cat == id_cat){
                        output.push(data[i]);
                    }
                }
            }
            else {
                output = data;
            }
            return output;
        }
    }]);

require('./google-map-profile.component');
