'use strict';

require('./add-giftcard-page/add-giftcard-page.module');
require('./edit-giftcard-page/edit-giftcard-page.module');

angular.module('adminGiftcard', [
  'addGiftcardPage',
  'editGiftcardPage'
]);
require('./admin-giftcard.component');
