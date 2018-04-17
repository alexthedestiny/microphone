'use strict';

require('../../bower_components/slick-carousel/slick/slick.css');
require('../../bower_components/slick-carousel/slick/slick-theme.css');

require('../../../assets/js/scripts');
require('../../../assets/js/angular-localization.min');
require('../../core/core.module');
require('./index-page/index-page.module');
require('./login-page/login-page.module');
require('./register-page/register-page.module');
require('./header-open/header-open.module');
require('./footer-classic/footer-classic.module');
require('./kosmoclub-page/kosmoclub-page.module');
require('./discount-catalog-page/discount-catalog-page.module');
require('./friendly-club-page/friendly-club-page.module');
require('./consultant-page/consultant-page.module');
require('./catalog-page/catalog-page.module');
require('./news/news.module');
require('./vacancies/vacancies.module');
require('./about-page/about-page.module');
require('./public-information-page/public-information-page.module');
require('./social-responsibility-page/social-responsibility-page.module');
require('./reviews-page/reviews-page.module');
require('./tenders-page/tenders-page.module');
require('./life-page/life-page.module');
require('./advertising-page/advertising-page.module');
require('./complaints-page/complaints-page.module');
require('./store-addresses-page/store-addresses-page.module');
require('./blog-page/blog-page.module');
require('./answers-page/answers-page.module');
require('./advices-page/advices-page.module');
require('./brands-page/brands-page.module');
require('./cart-page/cart-page.module');
require('./wish-list-page/wish-list-page.module');

require('angular-cookies');
require('../../../node_modules/angular-translate/dist/angular-translate');
require('../../../node_modules/angular-animate/angular-animate');
require('../../../node_modules/ng-file-upload/dist/ng-file-upload-shim');
require('../../../node_modules/ng-file-upload/dist/ng-file-upload');
require('../../../node_modules/angular-modal-service/dst/angular-modal-service.min.js');

require('../../bower_components/slick-carousel/slick/slick.js');
require('../../bower_components/angular-slick-carousel/dist/angular-slick.min.js');


angular.module('user', [
  'headerOpen',
  'footerClassic',
  'ngAnimate',
  'ui.router',
  'core',
  'indexPage',
  'loginPage',
  'registerPage',
  'uiGmapgoogle-maps',
  'pascalprecht.translate',
  'slickCarousel',
  'kosmoclubPage',
  'discountCatalogPage',
  'friendlyClubPage',
  'consultantPage',
  'catalogPage',
  'news',
  'aboutPage',
  'publicInformationPage',
  'socialResponsibilityPage',
  'reviewsPage',
  'tendersPage',
  'lifePage',
  'advertisingPage',
  'complaintsPage',
  'storeAddressesPage',
  'vacancies',
  'blogPage',
  'answersPage',
  'advicesPage',
  'brandsPage',
  'cartPage',
  'wishListPage',
]);

require('./user.component');
require('./user.config');
require('../../directives/news-card/news-card.directive');
require('../../directives/product-card/product-card.directive');
require('../../directives/cart-product-card/cart-product-card.directive');
require('../../directives/wish-list-card/wish-list-card.directive');

