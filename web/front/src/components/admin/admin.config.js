'use strict';

angular.
module('admin').
config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider',
    function config($locationProvider, $stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
      $locationProvider.html5Mode(true).hashPrefix('!');
      uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
      $urlRouterProvider.otherwise('/admin/');
      $stateProvider
        .state('admin.profile', {
          url: '/{userId:[0-9]+}',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-page></admin-page>'
              }
          }
        })
        .state('admin.login', {
          url: '/login',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-login></admin-login>'
              }
          }
        })
        .state('admin.loginSlashes', {
          url: '/login/',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-login></admin-login>'
              }
          }
        })
      .state('admin.brand', {
          url: '/brand/',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-brand></admin-brand>'
              }
          }
      })
          .state('admin.addBrand', {
              url: '/brand/add/',
              params : {
                  openHeader: true
              },
              views: {
                  'content': {
                      template: '<add-brand></add-brand>'
                  }
              }
          })
          .state('admin.editBrand', {
              url: '/brand/edit/',
              params : {
                  openHeader: true
              },
              views: {
                  'content': {
                      template: '<edit-brand></edit-brand>'
                  }
              }
          })
          .state('admin.allBrand', {
              url: '/brand/all/',
              params : {
                  openHeader: true
              },
              views: {
                  'content': {
                      template: '<all-brand></all-brand>'
                  }
              }
          })
          .state('admin.allBrandPage', {
              url: '/brand/all/{id_brand:[0-9]+}',
              params : {
                  openHeader: true
              },
              views: {
                  'content': {
                      template: '<all-brand-page></all-brand-page>'
                  }
              }
          })
          .state('admin.editBrandPage', {
              url: '/brand/edit/{id_brand:[0-9]+}',
              params : {
                  openHeader: true
              },
              views: {
                  'content': {
                      template: '<edit-brand-page></edit-brand-page>'
                  }
              }
          })
        .state('admin.vacancies', {
          url: '/vacancies',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-vacancies></admin-vacancies>'
              }
          }
        })
        .state('admin.about', {
          url: '/about',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-about></admin-about>'
              }
          }
        })
        .state('admin.public', {
          url: '/public',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-public-info></admin-public-info>'
              }
          }
        })
        .state('admin.socialResponcibility', {
          url: '/social-responsibility',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-social-responsibility></admin-social-responsibility>'
              }
          }
        })
        .state('admin.storeAddresses', {
          url: '/store-addresses',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-store-addresses></admin-store-addresses>'
              }
          }
        })
        .state('admin.editVacancyPage', {
            url: '/vacancies/edit/{vacancyId:[0-9]+}',
            params : {
                openHeader: true
            },
            views: {
                'content': {
                    template: '<edit-vacancies-page></edit-vacancies-page>'
                }
            }
        })
        .state('admin.addVacancyPage', {
            url: '/vacancies/add/',
            params : {
                openHeader: true
            },
            views: {
                'content': {
                    template: '<add-vacancies-page></add-vacancies-page>'
                }
            }
        })
        .state('admin.news', {
          url: '/news',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<admin-news></admin-news>'
              }
          }
        })
        .state('admin.editNewsPage', {
          url: '/news/edit/{newsId:[0-9]+}',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<edit-news-page></edit-news-page>'
              }
          }
      })
      .state('admin.addNewsPage', {
          url: '/news/add/',
          params : {
              openHeader: true
          },
          views: {
              'content': {
                  template: '<add-news-page></add-news-page>'
              }
          }
      })
      .state('admin.discount', {
        url: '/discount',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<admin-discount></admin-discount>'
            }
        }
      })
      .state('admin.editDiscountPage', {
        url: '/discount/edit/{discountId:[0-9]+}',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<edit-discount-page></edit-discount-page>'
            }
        }
      })
      .state('admin.addDiscountPage', {
        url: '/discount/add/',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<add-discount-page></add-discount-page>'
            }
        }
      })
      .state('admin.giftcards', {
        url: '/giftcards',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<admin-giftcard></admin-giftcard>'
            }
        }
      })
      .state('admin.editGiftcardPage', {
        url: '/giftcards/edit/{giftcardId:[0-9]+}',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<edit-giftcard-page></edit-giftcard-page>'
            }
        }
      })
      .state('admin.addGiftcardPage', {
        url: '/giftcards/add/',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<add-giftcard-page></add-giftcard-page>'
            }
        }
      })
      .state('admin.trademark', {
        url: '/trademark',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<admin-trademark></admin-trademark>'
            }
        }
      })
      .state('admin.editTrademarkPage', {
        url: '/trademark/edit/{trademarkId:[0-9]+}',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<edit-trademark-page></edit-trademark-page>'
            }
        }
      })
      .state('admin.addTrademarkPage', {
        url: '/trademark/add/',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<add-trademark-page></add-trademark-page>'
            }
        }
      })
      .state('admin.catalog', {
        url: '/catalog',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<admin-catalog></admin-catalog>'
            }
        }
      })
      .state('admin.editProductPage', {
        url: '/catalog/edit/{productId:[0-9]+}',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<edit-product-page></edit-product-page>'
            }
        }
      })
      .state('admin.addProductPage', {
        url: '/catalog/add/',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<add-product-page></add-product-page>'
            }
        }
      })
      .state('admin.tenders', {
        url: '/tenders',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<admin-tenders></admin-tenders>'
            }
        }
      })
      .state('admin.editTendersPage', {
        url: '/tenders/edit/{tenderId:[0-9]+}',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<edit-tenders-page></edit-tenders-page>'
            }
        }
      })
      .state('admin.addTendersPage', {
        url: '/tenders/add/',
        params : {
            openHeader: true
        },
        views: {
            'content': {
                template: '<add-tenders-page></add-tenders-page>'
            }
        }
      })
      
  }
  ]);
