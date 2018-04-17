'use strict';

require('./product-page/product-page.module');
require('./trademark-catalog-page/trademark-catalog-page.module');
require('./giftcards-catalog-page/giftcards-catalog-page.module');
require('./brands-catalog-page/brands-catalog-page.module');

// Define the `indexPage` module
angular.module('catalogPage', [
  'productPage',
  'trademarkCatalogPage',
  'giftcardsCatalogPage',
  'brandsCatalogPage'
]);
require('./catalog-page.component');
