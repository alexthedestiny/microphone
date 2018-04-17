'use strict';
require('./trademark-page/trademark-page.module');
// Define the `indexPage` module
angular.module('trademarkCatalogPage', [
  'trademarkPage'
]);
require('./trademark-catalog-page.component');
