'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
module('footerClassic').
component('footerClassic', {
  template: require('./footer-classic.template.html'),
  controller: ['$scope', '$rootScope', '$mdDialog', '$stateParams', '$translate',
  function FooterClassicController($scope, $rootScope, $mdDialog, $stateParams, $translate) {
    
  }
  ]
});
