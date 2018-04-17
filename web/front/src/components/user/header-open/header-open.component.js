'use strict';

angular.
  module('headerOpen').
  component('headerOpenComponent', {
    template: require('./header-open.template.html'),
    controller: ['$scope', '$rootScope', 'AuthenticationService', 'UserService', 'CartService', 'WishlistService', 'LocalizationService', '$translate', '$timeout',
      function HeaderOpenController($scope, $rootScope, AuthenticationService, UserService, CartService, WishlistService, LocalizationService, $translate, $timeout) {
        $scope.sessionCartLength = 0;

        LocalizationService.LoadLanguage();
        $scope.$watch(()=>{
          return LocalizationService.GetLanguage();
        },(lang)=>{
          if(lang && lang.key){
            $scope.lang = lang.key;
            $translate.use(lang.key); 
            console.log('lang',lang.key);
          }
        });
        
        UserService.LoadUserSessionId();
        $scope.$watch(
          UserService.GetUserSessionId,
          function(userSession) {
            if(userSession){
              if(userSession && userSession.data > 0) {
                $rootScope.userSession = userSession.data;
                UserService.loadUserById($rootScope.userSession);
                $scope.$watch(()=>{
                  return UserService.getUserById();
                },(user)=>{
                  if(user && user.length>0 && user[0].id == $rootScope.userSession){
                    $scope.user = user[0];
                  }
                });
              }
              else {
                $rootScope.userSession = 0;
                $scope.user = {};
              }
            }
          }
        );

        $scope.$watch(()=>{
          return $rootScope.adminSession;
        },(adminId)=>{
          $scope.adminId = adminId;
        });

        CartService.LoadSessionCart();
        $scope.$watch(()=>{
          return CartService.GetSessionCart();
        },(cart)=>{
          if(cart && cart.length>0){
            $scope.sessionCart = cart;
            $scope.sessionCartLength = cart.length;
          }
        });

        WishlistService.LoadSessionWishlist();
        $scope.$watch(()=>{
          return WishlistService.GetSessionWishlist();
        },(wishlist)=>{
          if (wishlist && wishlist.length>0){
            $scope.sessionWishlist = wishlist;
            $scope.sessionWishlistLength = wishlist.length;
          }
        });

        $scope.logout = function() {
          AuthenticationService.Logout($rootScope.userSession);
          // $rootScope.userSession = 0;
          // $rootScope.adminSession = undefined;
          // $scope.user = {};
        };

        $scope.changeLanguage = (key) => {
          if($scope.lang && key!=$scope.lang){
            LocalizationService.SetLanguage(key);
            $('.language-change-overlay').addClass('language-change-overlay__active');
            $timeout(()=>{
              // $translate.use(key);
              LocalizationService.LoadLanguage();
              $('.language-change-overlay').removeClass('language-change-overlay__active');
            }, 1000);
          }
          
        }
        
      }
    ]
  });
