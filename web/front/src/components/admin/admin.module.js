'use strict';
require('../../../assets/js/text-angular');

require('../../../assets/js/angular-localization.min');
require('../../core/core.module');
require('../../../node_modules/angular-translate/dist/angular-translate');
require('../../../node_modules/angular-animate/angular-animate');
require('../../../node_modules/ng-file-upload/dist/ng-file-upload-shim');
require('../../../node_modules/ng-file-upload/dist/ng-file-upload');
require('../../../node_modules/angular-modal-service/dst/angular-modal-service.min.js');
require('../../../node_modules/angular-file-upload/dist/angular-file-upload');


require('./admin-page/admin-page.module');
require('./vacancies/vacancies.module');
require('./admin-news/admin-news.module');
require('./admin-discount/admin-discount.module');
require('./admin-giftcard/admin-giftcard.module');
require('./admin-trademark/admin-trademark.module');
require('./admin-catalog/admin-catalog.module');
require('./admin-tenders/admin-tenders.module');
require('./admin-login/admin-login.module');
require('./admin-about/admin-about.module');
require('./admin-public-info/admin-public-info.module');
require('./admin-social-responsibility/admin-social-responsibility.module');
require('./admin-store-addresses/admin-store-addresses.module');
require('./admin-brand/admin-brand.module');

angular.module('admin', [
  'userSideMenu',
  'coachSideMenu',
  'headerOpen',
  'textAngular',
  'ngAnimate',
  'ui.router',
  'core',
  'ui.calendar', 
  'angularFileUpload',
  'adminPage',
  'adminVacancies',
  'adminNews',
  'adminDiscount',
  'adminGiftcard',
  'adminTrademark',
  'adminCatalog',
  'adminTenders',
  'adminLogin',
  'adminAbout',
  'adminPublicInfo',
  'adminSocialResponsibility',
  'adminStoreAddresses',
  'adminBrand'
]);

require('./admin.component');
require('./admin.config');
