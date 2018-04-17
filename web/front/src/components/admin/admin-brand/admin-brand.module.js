'use strict';
require('./add-brand/add-brand.module');
require('./edit-brand/edit-brand.module');
require('./all-brand/all-brand.module');
// Define the `indexPage` module
angular.module('adminBrand', [
    'addBrand', 'editBrand', 'allBrand'
]);
require('./admin-brand.component');
