'use strict';

angular.
module('editProductPage')
.component('editProductPage', {
  template: require('./edit-product-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'AdminService', '$stateParams', '$location', 'ProductService', 'FileUploader', 'BrandsService',
  function editProductPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, AdminService, $stateParams, $location, ProductService, FileUploader, BrandsService) {
  		if($stateParams.productId){
  			$scope.productId = $stateParams.productId;
  		}
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
              ProductService.LoadProductById($scope.productId);
              $scope.$watch(()=>{
                return ProductService.GetProductById();
              },(product)=>{
                if(product && product.id == $scope.productId){
                  $scope.product = product;
                  let tempAvailability = [];
                  if($scope.product.availability){
                    angular.forEach($scope.product.availability,(item)=>{
                      tempAvailability.push(item.store_id);
                    });
                  }
                  $scope.product.availability = tempAvailability;
                }
              });

              ProductService.LoadStoresList();
              $scope.$watch(()=>{
                return ProductService.GetStoresList();
              },(stores)=>{
                if(stores && stores.length>0){
                  $scope.stores = stores;
                }
              });

              ProductService.LoadCategories();
              $scope.$watch(()=>{
                return ProductService.GetCategories();
              },(categories)=>{
                if(categories && categories.length>0){
                  $scope.categoriesList = [];
                  $scope.categoriesArr = [];
                  angular.forEach(categories, (category)=>{
                    if($scope.categoriesList.indexOf(category.id_category)==-1){
                      $scope.categoriesList.push(category.id_category);
                      $scope.categoriesArr.push({id:category.id_category, title:category.category_title});
                    }
                  });
                  $scope.categories = categories;
                }
              });

              BrandsService.LoadBrands();
              $scope.$watch(()=>{
                return BrandsService.GetBrands();
              },(brands)=>{
                if(brands && brands.length>0){
                  $scope.brands = brands;
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

      $scope.selectProductCategory = (selectedCategory) => {
        if(selectedCategory){
          $scope.product.id_category = selectedCategory.id_category;
          $scope.product.id_subcategory = selectedCategory.id_subcategory;
          $scope.selectedCategory = null;
        } 
      }

      $scope.save = ()=>{
        ProductService.Update($scope.product).then((response)=>{
          if(response && response.data==1){
            alert('edited');
          }
        });
      }
      //upload image start
      $scope.image = {
        originalImage: '',
        croppedImage: ''
      };
      var uploader = $scope.uploaderAvatar = new FileUploader({
        url: '/product/edit/'
      });
      uploader.onAfterAddingFile = function(item) {
        var reader = new FileReader();
        reader.onload = function(event) {
          $scope.$apply(function(){
            $scope.image.originalImage = event.target.result;
          });
        };
        reader.readAsDataURL(item._file);
      };
      uploader.onBeforeUploadItem = function(item) {
        var blob = dataURItoBlob($scope.image.croppedImage);
        item._file = blob;
      };
      var dataURItoBlob = Main.dataURItoBlob;
      //upload image end
      //upload gallery start
      $scope.removePhoto = $event => {
        for(var i = 0; i < $scope.gallery.length; i++) {
          if($scope.gallery[i] == $event) {
            $scope.gallery.splice(i, 1);
            Main.setMediaData($scope.gallery);
          }
        }
      };
      var uploaderGallery = $scope.uploaderGallery = new FileUploader({
        url: '/product/edit'
      });
      uploaderGallery.onAfterAddingFile = function(item) {
        var fileExtension = '.' + item.file.name.split('.').pop();
        item.file.name = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
        item.alias = 'gallery';
      };
      //upload gallery end

    }
  ]
});
