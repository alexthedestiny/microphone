'use strict';

require('./discount-page/discount-page.module');
// Define the `indexPage` module
angular.module('discountCatalogPage', [
  'discountPage'
]);
require('./discount-catalog-page.component');
