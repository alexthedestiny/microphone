'use strict';

require('./add-product-page/add-product-page.module');
require('./edit-product-page/edit-product-page.module');

angular.module('adminCatalog', [
  'addProductPage',
  'editProductPage'
]);
require('./admin-catalog.component');
