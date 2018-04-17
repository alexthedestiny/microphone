'use strict';

require('./add-vacancies-page/add-vacancies-page.module');
require('./edit-vacancies-page/edit-vacancies-page.module');

angular.module('adminVacancies', [
	'addVacanciesPage',
  	'editVacanciesPage'
]);
require('./vacancies.component');
