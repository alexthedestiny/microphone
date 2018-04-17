'use strict';

require('./add-discount-page/add-discount-page.module');
require('./edit-discount-page/edit-discount-page.module');

angular.module('adminDiscount', [
  'addDiscountPage',
  'editDiscountPage'
]);
require('./admin-discount.component');
