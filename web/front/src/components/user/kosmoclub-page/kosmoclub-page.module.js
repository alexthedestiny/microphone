'use strict';


require('./about-kosmo-club/about-kosmo-club.module.js');

// Define the `indexPage` module
angular.module('kosmoclubPage', [
	'aboutKosmoClub'
]);
require('./kosmoclub-page.component');
