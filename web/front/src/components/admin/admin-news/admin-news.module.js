'use strict';

require('./add-news-page/add-news-page.module');
require('./edit-news-page/edit-news-page.module');

angular.module('adminNews', [
  'addNewsPage',
  'editNewsPage'
]);
require('./admin-news.component');
