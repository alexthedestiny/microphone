'use strict';

require('./add-trademark-page/add-trademark-page.module');
require('./edit-trademark-page/edit-trademark-page.module');

angular.module('adminTrademark', [
  'addTrademarkPage',
  'editTrademarkPage'
]);
require('./admin-trademark.component');
