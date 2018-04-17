'use strict';

angular.
module('account').
config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider',
    function config($locationProvider, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
      uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
      $urlRouterProvider.otherwise('/account/');
      $stateProvider
      .state('account.profile', {
        url: '/{userId:[0-9]+}',
        params : {
            type: null,
            openHeader: true
        },
        views: {
            'content': {
                template: '<user-profile></user-profile>'
            }
        }
    })
    .state('account.settings', {
        url: '/settings',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<user-settings></user-settings>'
            }
        }
    })
    .state('account.details', {
        url: '/details',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<user-data></user-data>'
            }
        }
    })
    .state('account.shoppingList', {
        url: '/shopping-list',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<shopping-list></shopping-list>'
            }
        }
    })
    .state('account.wishesList', {
        url: '/wishes',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<wishes-list></wishes-list>'
            }
        }
    })
    .state('account.scores', {
        url: '/scores',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<scores-page></scores-page>'
            }
        }
    })
    .state('account.discounts', {
        url: '/discounts',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<user-discounts></user-discounts>'
            }
        }
    })
    .state('account.card', {
        url: '/card',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<user-card></user-card>'
            }
        }
    })
    .state('account.suggestions', {
        url: '/suggestions',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<user-suggestions></user-suggestions>'
            }
        }
    })

  }
  ]);
