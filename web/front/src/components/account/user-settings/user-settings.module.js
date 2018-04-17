'use strict';

require('../../../../node_modules/angular-material-icons/angular-material-icons.min');

require('./user-account-settings/user-account-settings.module');

angular.module('userSettings', [

  'userAccountSettings',
   
  'uiGmapgoogle-maps'
]);


require('./user-settings.component');
