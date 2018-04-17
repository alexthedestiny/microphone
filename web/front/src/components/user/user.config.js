'use strict';

angular.
  module('user').
  config(['$locationProvider', 'slickCarouselConfig', '$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider',
    function config($locationProvider, slickCarouselConfig, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
        slickCarouselConfig.dots = true;
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('user.index', {
                /* The Index State */
                url: '/',
                params : {
                    openHeader: true,
                    enableFooterImg: true,
                    headerContainer: true
                },
                views: {
                    'content': {
                        template: '<index-page></index-page>'
                    }
                }
            })
            .state('user.login', {
                /* The about State */
                url: '/login',
                params : {
                    openHeader: true,
                    headerContainer: false
                },
                views: {
                    'content': {
                        template: '<login-page-component></login-page-component>'
                    }
                }
            })
            .state('user.brands', {
                /* The about State */
                url: '/brands',
                params : {
                    openHeader: true,
                    headerContainer: false
                },
                views: {
                    'content': {
                        template: '<brands-page></brands-page>'
                    }
                }
            })
            .state('user.brandsPageItem', {
                /* The about State */
                url: '/brands/{id_brand:[0-9]+}',
                params : {
                    openHeader: true,
                    headerContainer: false
                },
                views: {
                    'content': {
                        template: '<brands-page-item></brands-page-item>'
                    }
                }
            })
            .state('user.cartPage', {
                url: '/account/cart',
                params : {
                    openHeader: true,
                    headerContainer: false
                },
                views: {
                    'content': {
                        template: '<cart-page></cart-page>'
                    }
                }
            })
            .state('user.wishList', {
                /* The about State */
                url: '/account/wishlist',
                params : {
                    openHeader: true,
                    headerContainer: false
                },
                views: {
                    'content': {
                        template: '<wish-list-page></wish-list-page>'
                    }
                }
            })
            .state('user.register', {
                /* The about State */
                url: '/register',
                params : {
                    openHeader: true,
                    headerContainer: false
                },
                views: {
                    'content': {
                        template: '<register-page-component></register-page-component>'
                    }
                }
            })
            .state('user.kosmoclub', {
                url: '/club',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<kosmoclub-page></kosmoclub-page>'
                    }
                }
            })
            .state('user.kosmoclubAbout', {
                url: '/club/about',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<about-kosmo-club></about-kosmo-club>'
                    }
                }
            })
            .state('user.discountCatalog', {
                url: '/discount',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<discount-catalog-page></discount-page>'
                    }
                }
            })
            .state('user.discount', {
                url: '/discount/{discountId: [0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<discount-page></discount-page>'
                    }
                }
            })
            .state('user.friendlyClubPage', {
                url: '/partners',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<friendly-club-page></friendly-club-page>'
                    }
                }
            })
            .state('user.partnersList', {
                url: '/partners/all',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<partners-list></partners-list>'
                    }
                }
            })
            .state('user.partnerPage', {
                url: '/partners/{partnerId: [0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<partner-page></partner-page>'
                    }
                }
            })
            .state('user.consultant', {
                url: '/consultant',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<consultant-page></consultant-page>'
                    }
                }
            })
            .state('user.catalog', {
                url: '/catalog',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<catalog-page></catalog-page>'
                    }
                }
            })
            .state('user.catalogProduct', {
                url: '/catalog/{productId:[0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<product-page></catalog-page>'
                    }
                }
            })
            .state('user.newsPage', {
                url: '/news/{newsId:[0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<news-page></news-page>'
                    }
                }
            })
            .state('user.news', {
                url: '/news/',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<news></news>'
                    }
                }
            })
            .state('user.about', {
                url: '/about',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<about-page></about-page>'
                    }
                }
            })
            .state('user.publicInformation', {
                url: '/public-information',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<public-information-page></public-information-page>'
                    }
                }
            })
            .state('user.socialResponsibility', {
                url: '/social-responsibility',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<social-responsibility-page></social-responsibility-page>'
                    }
                }
            })
            .state('user.reviews', {
                url: '/reviews',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<reviews-page></reviews-page>'
                    }
                }
            })
            .state('user.tenders', {
                url: '/tenders',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<tenders-page></tenders-page>'
                    }
                }
            })
            .state('user.tenderPage', {
                url: '/tenders/{tenderId:[0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<tender-page></tender-page>'
                    }
                }
            })
            .state('user.life', {
                url: '/life',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<life-page></life-page>'
                    }
                }
            })
            .state('user.advertising', {
                url: '/advertising',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<advertising-page></advertising-page>'
                    }
                }
            })
            .state('user.complaints', {
                url: '/complaints-and-suggestions',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<complaints-page></complaints-page>'
                    }
                }
            })
            .state('user.storeAddresses', {
                url: '/store-addresses',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<store-addresses-page></store-addresses-page>'
                    }
                }
            })
            .state('user.vacancies', {
                url: '/vacancies',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<vacancies></vacancies>'
                    }
                }
            })
            .state('user.vacancyPage', {
                url: '/vacancies/{vacancyId:[0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<vacancies-page></vacancies-page>'
                    }
                }
            })
            .state('user.blogPage', {
                url: '/blog',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<blog-page></blog-page>'
                    }
                }
            })
            .state('user.answersPage', {
                url: '/answers',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<answers-page></answers-page>'
                    }
                }
            })
            .state('user.advicesPage', {
                url: '/advices',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<advices-page></advices-page>'
                    }
                }
            })
            .state('user.trademarksCatalogPage', {
                url: '/catalog/trademarks',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<trademark-catalog-page></trademark-catalog-page>'
                    }
                }
            })
            .state('user.giftcardsPage', {
                url: '/catalog/giftcards',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<giftcards-catalog-page></giftcards-catalog-page>'
                    }
                }
            })
            .state('user.brandsPage', {
                url: '/catalog/brands',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<brands-catalog-page></brands-catalog-page>'
                    }
                }
            })
            .state('user.brandPage', {
                url: '/catalog/brands/{brandId:[0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<brand-page></brand-page>'
                    }
                }
            })
            .state('user.trademarkPage', {
                url: '/catalog/trademarks/{trademarkId:[0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<trademark-page></trademark-page>'
                    }
                }
            })
            .state('user.giftcardPage', {
                url: '/catalog/giftcards/{giftcardId:[0-9]+}',
                params : {
                    openHeader: true
                },
                views: {
                    'content': {
                        template: '<giftcard-page></giftcard-page>'
                    }
                }
            })

    }
]);
