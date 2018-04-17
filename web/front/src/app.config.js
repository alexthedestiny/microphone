'use strict';

angular.
  module('kosmoApp').
    config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', '$qProvider', '$translateProvider',
      function config($locationProvider, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, $qProvider, $translateProvider) {
        $qProvider.errorOnUnhandledRejections(false);
        // $locationProvider.html5Mode(true).hashPrefix('!');
        uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyC2qMrcwaVpSRGg2tzINh4AlJBJR-er6kw',
          v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
        });
        $urlRouterProvider.otherwise("/404/");
        $stateProvider
          .state('account', {
              /* The Root State */
              url: '/account',
              views: {
                  '': {
                      abstract: true,
                      template: '<account></account>'
                  },
                  'header@root': {

                  },
                  'footer@root': {

                  }
              }
          })
          .state('admin', {
              /* The Root State */
              url: '/admin',
              views: {
                  '': {
                      abstract: true,
                      template: '<admin></admin>'
                  },
                  'header@root': {

                  },
                  'footer@root': {

                  }
              }
          })
          .state('user', {
              /* The Root State */
              url: '',
              views: {
                  '': {
                      abstract: true,
                      template: '<user></user>'
                  },
                  'header@root': {

                  },
                  'footer@root': {

                  }
              }
          }).state('404', {
            url:'/404/',
            template: '<notfound></notfound>'
          });

          var ua_translations = {
            //header
            "about-company" : "Про компанію",
            "about-us" : "Про нас",
            "cart-title" : "Корзина",
            "wishlist-title" : "Список побажань",
            "language-title" : "Мова",
            //index-page
            "main-page-title" : "Головна сторінка KOSMO",
            //footer
            "career-title" : "Кар'єра",
            "company-title" : "Компанія",
            "partnership-title" : "Співпраця",
            "contacts-title" : "Контакти",
            "news-title" : "Новини",
            "public-info-title" : "Публічна інформація",
            "socialresponcibility-title": "Соціальна відповідальність",
            "rewiews-title" : "Відгуки",
            "vacancies-title" : "Вакансії",
            "kosmo-life-title" : "Життя космо",
            "tenders-title" : "Тендери",
            "store-addresses-title" : "Адреси магазинів",
            "complaints-title" : "Скарги та пропозиції"
          }
          
          var ru_translations = {
            //header
            "about-company" : "О компании",
            "about-us": "О нас",
            "cart-title" : "Корзина",
            "wishlist-title" : "Список желаний",
            "language-title" : "Язык",
            //index-page
            "main-page-title" : "Главная страничка KOSMO",
            //footer
            "career-title" : "Карьера",
            "company-title" : "Компания",
            "partnership-title" : "Сотрудничество",
            "contacts-title" : "Контакты",
            "news-title" : "Новости",
            "public-info-title" : "Публичная информация",
            "socialresponcibility-title": "Социальная ответственность",
            "rewiews-title" : "Отзывы",
            "vacancies-title" : "Вакансии",
            "kosmo-life-title" : "Жизнь космо",
            "tenders-title" : "Тендеры",
            "store-addresses-title" : "Адреса магазинов",
            "complaints-title" : "Жалобы и предложения"
          }
          
          $translateProvider.translations('ru',ru_translations);
          
          $translateProvider.translations('ua',ua_translations);
          
          $translateProvider.preferredLanguage('ua');
      }
    ]);
