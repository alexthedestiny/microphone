'use strict';


var app = angular.
  module('userSideMenu')
  .component('userSideMenu', {
    template: require('./user-side-menu.template.html'),
    controller: ['$scope', '$rootScope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'UserService',
    function userSideMenuController($scope, $rootScope, $mdBottomSheet, $mdSidenav, $mdDialog, UserService) {
     $(document).ready(function () {
       $('.sidebar__toggle').click(function(){
        $(this).toggleClass('sidebar__toggle--active')
        $('.sidebar').toggleClass('sidebar--collapse');
        $('user-side-menu, .sidebar-wrap').toggleClass('sidebar-wrap--collapse');
        $('.main-col, [role="main"]').toggleClass('main-col--fw');
      });
       if(document.documentElement.clientWidth <=1020){
          $('.sidebar__toggle').addClass('sidebar__toggle--active');
          $('.sidebar-wrap').toggleClass('sidebar-wrap--collapse');
        }
       $(window).resize(function(){
        if(document.documentElement.clientWidth <=1020){
          $('.sidebar__toggle').addClass('sidebar__toggle--active');
          $('user-side-menu, .sidebar-wrap').addClass('sidebar-wrap--collapse');
        }else{
          $('.sidebar__toggle').removeClass('sidebar__toggle--active');
          $('user-side-menu, .sidebar-wrap').removeClass('sidebar-wrap--collapse');
          $('.sidebar').removeClass('sidebar--collapse');
        }
       });
       
       $('.btn-left').click(function(){
          event.preventDefault();
          if( $(this).attr('data-status')!='open' ){
            $('.sidebar').removeClass('sidebar--collapse');
            $('user-side-menu, .sidebar-wrap').removeClass('sidebar-wrap--collapse');
            $('user-side-menu, .sidebar-wrap').addClass('sidebar-wrap--mob');
            $(this).attr('data-status','open').addClass('btn-left-invert').css('position','relative');
            // $('.header').css('z-index','2');
            $('.side-list').css('display','block');
            $('.overlay').css('display','block').animate({'opacity':'0.8'},300);
          }else{
            $('.sidebar').addClass('sidebar--collapse');
            $('user-side-menu, .sidebar-wrap').addClass('sidebar-wrap--collapse');
            $('user-side-menu, .sidebar-wrap').removeClass('sidebar-wrap--mob');
            $(this).attr('data-status','close').removeClass('btn-left-invert').animate({"left":'0px'},1).css({'position':'fixed', "margin-left":'0px'});
            $('.side-list').css('display','none');
            // $('.header').css('z-index','100500');
            $('.overlay').animate({'opacity':'0'},300).css('display','none');
          }
       });
       $('.overlay').click(function(){
            $('.sidebar').addClass('sidebar--collapse');
            $('user-side-menu, .sidebar-wrap').addClass('sidebar-wrap--collapse');
            $('user-side-menu, .sidebar-wrap').removeClass('sidebar-wrap--mob');
            $('.btn-left').attr('data-status','close').removeClass('btn-left-invert').animate({"left":'0px'},1).css({'position':'fixed', "margin-left":'0px'});
            $('.side-list').css('display','none');
            // $('.header').css('z-index','100500');
            $('.overlay').animate({'opacity':'0'},300).css('display','none');
       });

       $(window).scroll(function(){
          if(document.documentElement.clientWidth <=1020 && document.documentElement.clientWidth >640){
            if( $(this).scrollTop() >=500 ){
              $('.sidebar-toggle-wrap>a.btn-left').css({'display':'none'})
            }else{
              $('.sidebar-toggle-wrap>a.btn-left').css({'display':'block'})
            }
          }
          if(document.documentElement.clientWidth <=640){
            if( $(this).scrollTop() >=280 ){
              $('.sidebar-toggle-wrap>a.btn-left').css({'display':'none'})
            }else{
              $('.sidebar-toggle-wrap>a.btn-left').css({'display':'block'})
            }
          }
        });


     });

   $scope.userSession = $rootScope.userSession;
   $scope.$watch(
    function() {
      return $rootScope.rootUser
    },
    function(user) {
      if(user !== undefined) {
        $scope.user = user;
        $scope.userId = parseInt(user.id);
        $scope.toggleSidenav = function(menuId) {
          $mdSidenav(menuId).toggle();
        };
        $scope.sections = [{
          name: 'Getting Started',
          state: 'home.gettingstarted',
          type: 'link'
        }];

        $scope.menu = [
        {
          link: 'account.profile({userId:'+$scope.userSession+'})',
          title: 'Мой профиль',
          icon: 'home',
                                  /*submenu: [
                                      {
                                          link: '',
                                          title: 'd1',
                                          icon: 'd1'
                                      },
                                      {
                                          link: '',
                                          title: 'd2',
                                          icon: 'd2'
                                      },{
                                          link: '',
                                          title: 'd3',
                                          icon: 'd3'
                                      },
                                      {
                                          link: '',
                                          title: 'd4',
                                          icon: 'd4'
                                      }
                                      ]*/
                                    },
                                    {
                                      link: 'account.schedule',
                                      title: 'Расписание',
                                      icon: 'access_time'
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
                                      link: 'account.clients',
                                      title: 'Мои клиенты',
                                      icon: 'people'
                                    },
                                    {
                                      link: 'account.platforms',
                                      title: 'Мои площадки',
                                      icon: 'local_convenience_store'
                                    },
                                    {
                                      link: 'account.events',
                                      title: 'Мои события',
                                      icon: 'date_range'
                                    },
                                    {
                                      link: 'account.classes',
                                      title: 'Мои занятия',
                                  // icon: 'local_activity'
                                  icon: 'accessibility'
                                },
                                {
                                  link: 'account.tournaments',
                                  title: 'Мои турниры',
                                  icon: 'local_activity'
                                },
                                {
                                  link: 'account.vacancies',
                                  title: 'Мои вакансии',
                                  icon: 'contact_mail'
                                },
                                {
                                  link: 'account.staff',
                                  title: 'Тренера',
                                  icon: 'person_pin'
                                },
                                {
                                  link: 'account.subscriptions',
                                  title: 'Мои абонементы',
                                  icon: 'credit_card'
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
                                }];
                              }
                            }
                            );
$scope.toggleSidenav = function(menuId) {
  $mdSidenav(menuId).toggle();
};
$scope.sections = [{
  name: 'Getting Started',
  state: 'home.gettingstarted',
  type: 'link'
}];

$scope.menu = [
{
  link: 'account.profile({userId:'+$scope.userId+'})',
  title: 'Мой профиль',
  icon: 'home',
                        /*submenu: [
                            {
                                link: '',
                                title: 'd1',
                                icon: 'd1'
                            },
                            {
                                link: '',
                                title: 'd2',
                                icon: 'd2'
                            },{
                                link: '',
                                title: 'd3',
                                icon: 'd3'
                            },
                            {
                                link: '',
                                title: 'd4',
                                icon: 'd4'
                            }
                            ]*/
                          },
                          {
                            link: 'account.clients',
                            title: 'Клиенты',
                            icon: 'people'
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
                            link: 'account.diary',
                            title: 'Дневник',
                            icon: 'content_paste'
                          },
                          {
                            link: 'account.statistics',
                            title: 'Статистика',
                            icon: 'insert_chart'
                          },
                          ];

                          $scope.admin = [
                    /*{
                     link: '',
                     title: 'Trash',
                     icon: 'delete'
                   },*/
                   {
                    link: 'account.settings',
                    title: 'Настройки',
                    icon: 'settings'
                  }];

                  $scope.alert = '';
                }]});

app.directive('userAvatar', function() {
  return {
    replace: true,
    template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
  };
});
