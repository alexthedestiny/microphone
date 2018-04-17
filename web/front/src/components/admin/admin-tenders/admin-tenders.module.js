'use strict';

require('./add-tenders-page/add-tenders-page.module');
require('./edit-tenders-page/edit-tenders-page.module');

angular.module('adminTenders', [
  'addTendersPage',
  'editTendersPage'
]);
require('./admin-tenders.component');
