'use strict';

angular.
module('adminCatalog')
.component('adminCatalog', {
  template: require('./admin-catalog.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'ProductService',
  function adminCatalogController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, ProductService) {
  		if(!$rootScope.adminSession) {
        AdminService.LoadAdminSessionId();
      }
      $scope.$watch(
        AdminService.GetAdminSessionId,
        function(adminSession) {
          if(adminSession){
            if(adminSession && adminSession.data > 0) {
              $rootScope.adminSession = adminSession.data;
              $scope.adminSession = adminSession.data;
              ProductService.LoadAllProducts();
              $scope.$watch(()=>{
                return ProductService.GetAllProducts();
              },(products)=>{
                if(products && products.length>0){
                  $scope.products = products;
                }
              });
            }
            else {
              $rootScope.adminSession = 0;
              $scope.adminSession = undefined;
              $location.path('/admin/login');
            }
          }
        }
      );
    }
  ]
});
