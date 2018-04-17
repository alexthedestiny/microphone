
'use strict';


require('../../../../node_modules/angular-material-time-picker/dist/md-time-picker.css');
require('../../../../node_modules/material-photo-gallery/dist/css/material-photo-gallery.css');

require('../../../../node_modules/ng-image-gallery/dist/ng-image-gallery.min.css');
require('../../../../node_modules/ng-image-gallery/dist/ng-image-gallery.min');

require('../../../../node_modules/angular-material-icons/angular-material-icons.min');
require('../../../../node_modules/angular-file-upload/dist/angular-file-upload');
require('../../../bower_components/fullcalendar/dist/fullcalendar.min.css');
require('../../../../vendor/mdPickers/dist/mdPickers');

require('../../../bower_components/angular-ui-calendar/src/calendar');
require('../../../bower_components/fullcalendar/dist/fullcalendar.min');
require('../../../bower_components/fullcalendar/dist/lang/ru');
require('../../../bower_components/fullcalendar/dist/gcal');

require('./user-account/user-account.module');

require('angular-messages');
require('angular-animate');
require('angular-aria');

var ngTimePicker = require('angular-material-time-picker');
require('ng-material-datetimepicker');

angular.module('userProfile', [
  'userAccount',
  'ngMaterial',
  'ngMdIcons',
  'googleMapProfile',
  'angularFileUpload',
  'thatisuday.ng-image-gallery',
  'ngMaterialDatePicker',
  "ngAnimate",
  "ngAria",
  "ngMessages",
  'mdPickers'
]);
require('./user-profile.component');
