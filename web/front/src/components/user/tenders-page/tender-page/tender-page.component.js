'use strict';

angular.
module('tenderPage')
.component('tenderPage', {
  template: require('./tender-page.template.html'),
  controller: ['$translate', '$scope', '$rootScope', '$filter', '$mdDialog', 'Main', 'UserService', '$stateParams', 'TendersService',
  function tenderPageController($translate, $scope, $rootScope, $filter, $mdDialog, Main, UserService, $stateParams, TendersService) {
  		if($stateParams.tenderId){
  			$scope.tenderId = $stateParams.tenderId;
  			TendersService.LoadTendersById($scope.tenderId);
  			$scope.$watch(()=>{
  				return TendersService.GetTendersById();
  			},(tender)=>{
  				if(tender && tender.id == $scope.tenderId){
  					$scope.tender = tender;
  					$scope.tender.photoAddress = ($scope.tender.photo!==null) ? '/uploads/tenders/images/'+$scope.tender.photo : 'https://upload.wikimedia.org/wikipedia/commons/6/6a/A_blank_flag.png';
  					$scope.tender.date_start = ($scope.tender.date_start) ? moment($scope.tender.date_start).format('YYYY-MMM-DD') : "Не указано";
  					$scope.tender.date_end = ($scope.tender.date_end) ? moment($scope.tender.date_end).format('YYYY-MMM-DD') : "Не указано";
  				}
  			});
  		}
    }
  ]
});
