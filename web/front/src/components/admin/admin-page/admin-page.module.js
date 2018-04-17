'use strict';

require('./bloger-page/bloger-page.module');
require('./main-admin-page/main-admin-page.module');
require('./moderator-page/moderator-page.module');

angular.module('adminPage', [
	'blogerPage',
	'mainAdminPage',
	'moderatorPage'
]);
require('./admin-page.component');
