'use strict';

angular.
  module('coachSideMenu')
  .component('coachSideMenu', {
    template: require('./coach-side-menu.template.html'),
    controller: ['$scope', '$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'UserService',
      function userSideMenuController($scope, $rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, UserService) {
        $scope.userSession = $rootScope.userSession;
        $scope.$watch(
          function() {
            return $rootScope.rootUser;
          },
          function(user) {
            if(angular.isDefined(user)) {
              $scope.user = user;
              $scope.userId = parseInt(user.id);
              // $scope.toggleSidenav = function(menuId) {
              //   $mdSidenav(menuId).toggle();
              // };
              $scope.sections = [{
                name: 'Getting Started',
                state: 'home.gettingstarted',
                type: 'link'
              }];
              $scope.menu = [
                {
                  link: 'account.profile({userId:'+$scope.user.id+'})',
                  title: 'Мой профиль',
                  icon: 'home',
                },
                {
                  link: 'account.friends',
                  title: 'Мои друзья',
                  icon: 'people'
                },
                {
                  link: 'account.clients',
                  title: 'Мои клиенты',
                  icon: 'people'
                },
                {
                  link: 'account.news',
                  title: 'Новости',
                  icon: 'message'
                },
                {
                  link: 'account.messages',
                  title: 'Сообщения',
                  icon: 'message'
                },
                {
                  link: 'account.schedule',
                  title: 'Расписание',
                  icon: 'date_range'
                },
                {
                  link: 'account.activity',
                  title: 'Активность',
                  icon: 'history'
                },
                {
                  link: 'account.statistics',
                  title: 'Статистика',
                  icon: 'insert_chart'
                },
                {
                  link: 'account.diary',
                  title: 'Дневник',
                  icon: 'content_paste'
                },
              ];
              $scope.admin = [
                {
                  link: 'account.settings',
                  title: 'Настройки',
                  icon: 'settings'
                }
              ];
              $scope.extraArray = [
                {
                  id: 1,
                  link: 'account.platforms',
                  title: 'Мои площадки',
                  icon: 'local_convenience_store'
                },
                {
                  id: 2,
                  link: 'account.events',
                  title: 'Мои события',
                  icon: 'date_range'
                },
                {
                  id: 3,
                  link: 'account.classes',
                  title: 'Мои занятия',
                  icon: 'accessibility'
                },
                {
                  id: 4,
                  link: 'account.tournaments',
                  title: 'Мои турниры',
                  icon: 'local_activity'
                },
                {
                  id: 5,
                  link: 'account.subscriptions',
                  title: 'Мои абонементы',
                  icon: 'credit_card'
                },
              ];
              $scope.extra = [];
          
            }
          }
        );
      }]});
