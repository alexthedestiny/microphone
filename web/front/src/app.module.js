'use strict';
var eslintConfigAngular = require('eslint-config-angular');
window.$ = window.jQuery = require('jquery');
const Moment =  window.moment = require('moment');
const MomentRange  =  window.momentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

require('../node_modules/angular-material/angular-material.css');
require('./bower_components/lodash/lodash');
require('../node_modules/jquery/dist/jquery');
require('../assets/sass/index.sass');

import angular from 'angular';
require('angular-touch');
require('../node_modules/angular-resource/angular-resource');
require('./bower_components/angular-ui-router/release/angular-ui-router');
require('./bower_components/angular-simple-logger/dist/angular-simple-logger');
require('./bower_components/angular-google-maps/dist/angular-google-maps');
require('../node_modules/angular-translate/dist/angular-translate');
require('../node_modules/angular-animate/angular-animate');
require('../node_modules/angular-aria/angular-aria.min');
// require('../node_modules/angular-messages/angular-messages.min');
// require('../node_modules/angular-material/angular-material');
require('../node_modules/ui-cropper/');
require('./core/core.module');
require('./components/user/user.module');
require('./components/account/account.module');
require('./components/admin/admin.module');
require('./components/user/notfound/notfound.module');
require('angular-mocks');
require('./bower_components/base-64/base64');
require('../assets/js/text-angular');
require('./components/user/header-open/header-open.module');

angular.module('kosmoApp', [
  'headerOpen',
  'textAngular',
  'ngAnimate',
  'ngAria',
  // 'ngMessages',
  // 'ngMaterial',
  'ui.router',
  'core',
  'user',
  'account',
  'admin',
  'notfound',
  'uiCropper'
]).directive('myEnter', function () {
  return function (scope, element, attrs) {
    element.bind('keydown keypress', function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.myEnter);
        });
        event.preventDefault();
      }
    });
  };
});
require('./app.config');
