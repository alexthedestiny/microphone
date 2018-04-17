'use strict';
require('../../../assets/js/text-angular');
require('../../../assets/js/scripts');
require('../../../assets/js/angular-localization.min');
require('../../core/core.module');

require('./user-profile/user-profile.module');
require('./user-settings/user-settings.module');
require('./elements/google-map-profile/google-map-profile.module');
require('./elements/google-map-settings/google-map-settings.module');
require('../../../node_modules/angular-translate/dist/angular-translate');
require('../../../node_modules/angular-animate/angular-animate');
require('../../../node_modules/ng-file-upload/dist/ng-file-upload-shim');
require('../../../node_modules/ng-file-upload/dist/ng-file-upload');
require('../../../node_modules/angular-modal-service/dst/angular-modal-service.min.js');
require('../../../node_modules/angular-file-upload/dist/angular-file-upload');

require('../user/header-open/header-open.module');
require('./user-header/user-side-menu/user-side-menu.module');
require('./user-header/coach-side-menu/coach-side-menu.module');
require('./user-data/user-data.module');
require('./shopping-list/shopping-list.module');
require('./wishes-list/wishes-list.module');
require('./scores-page/scores-page.module');
require('./user-discounts/user-discounts.module');
require('./user-card/user-card.module');
require('./user-suggestions/user-suggestions.module');
// Define the `sportApp` module
angular.module('account', [
  'userSideMenu',
  'coachSideMenu',
  'headerOpen',
  'userSideMenu',
  'coachSideMenu',
  'textAngular',
  'ngAnimate',
  'ui.router',
  'core',
  'userProfile',
  'userSettings',
  'ui.calendar',
  'googleMapProfile',
  'googleMapSettings', 
  'angularFileUpload',
  'userData',
  'shoppingList',
  'wishesList',
  'scoresPage',
  'userDiscounts',
  'userCard',
  'userSuggestions'
]);

require('./account.component');
require('./account.config');
