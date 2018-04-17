<?php

return array(
    'user/updateUserData'=>'user/updateUserData',
    'user/registerAjax' => 'user/registerAjax',
    'user/registerSocial' => 'user/registerSocial',
    'user/loginAjax' => 'user/loginAjax',
    'user/loginSocial' => 'user/loginSocial',
    'user/logout' => 'user/logout',
    'user/getUserSessionId' => 'user/getUserSessionId',
    'user/getSocialId' => 'user/getSocialId',
    'user/getUserById'=>'user/getUserById',
    'user/passwordRecovery'=>'user/passwordRecovery',
    'user/updateUserLocation'=>'user/updateUserLocation',

    'vacancy/updateVacancyData' => 'vacancy/updateVacanciesData',
    'vacancy/getVacanciesById' => 'vacancy/getVacanciesById',
    'vacancy/create' => 'vacancy/create',
    'vacancy/getAllVacancies' => 'vacancy/getAllVacancies',
    'vacancy/removeVacancies' => 'vacancy/removeVacancies',

    'tenders/updateTendersData' => 'tenders/updateTendersData',
    'tenders/getTendersById' => 'tenders/getTendersById',
    'tenders/create' => 'tenders/create',
    'tenders/getAllTenders' => 'tenders/getAllTenders',
    'tenders/removeTenders' => 'tenders/removeTenders',

    'news/updateNewsData' => 'news/updateNewsData',
    'news/getNewsById' => 'news/getNewsById',
    'news/create' => 'news/create',
    'news/getAllNews' => 'news/getAllNews',
    'news/removeNews' => 'news/removeNews',
    'news/getNLastNews' => 'news/getNLastNews',
    'news/newsByCat' => 'news/newsByCat',

    'admin/loginAjax' => 'admin/loginAjax',
    'admin/logout' => 'admin/logout',
    'admin/getAdminSessionId' => 'admin/getAdminSessionId',

    'about/getAbout' => 'about/getAbout',
    'about/update' => 'about/update',

    'public/getPublic' => 'public/getPublic',
    'public/update' => 'public/update',

    'social/getSocial' => 'social/getSocial',
    'social/update' => 'social/update',

    'stores/getAddresses' => 'stores/getAddresses',
    'stores/update' => 'stores/update',

    'account' => 'site/index',
    'admin' => 'site/index',
    'login' => 'site/index',
    'vacancy' => 'site/index',
    'news' => 'site/index',
    'partners' => 'site/index',
    'catalog' => 'site/index',
    'club'=>'site/index',
    'discount'=>'site/index',
    'consultant'=>'site/index',
    'public-information'=>'site/index',
    'social-responsibility'=>'site/index',
    'reviews'=>'site/index',
    'tenders'=>'site/index',
    'life'=>'site/index',
    'advertising'=>'site/index',
    'complaints-and-suggestions'=>'site/index',
    'store-addresses'=>'site/index',
    'blog'=>'site/index',
    'answers'=>'site/index',
    'advices'=>'site/index',
    'partners'=>'site/index',

    'product/getAllProducts'=>'product/getAllProducts',
    'product/getById'=>'product/getById',
    'product/getStoresList'=>'product/getStoresList',
    'product/getCategories'=>'product/getCategories',
    
    'product/add'=>'product/add',
    'product/edit'=>'product/edit',

    'brands/addBrand'=>'brands/addBrand',
    'brands/removeBrand'=>'brands/removeBrand',
    'brands/editBrand'=>'brands/editBrand',
    'brands/getBrands'=>'brands/getBrands',
    'brands/getBrandById'=>'brands/getBrandById',
    'brands/([a-z A-Z 0-9]+)'=>'site/index',

    'cart/add'=>'cart/add',
    'cart/getSessionCart'=>'cart/getSessionCart',
    'cart/getSessionCartProducts'=>'cart/getSessionCartProducts',
    'cart/removeProduct'=>'cart/removeProduct',

    'wishlist/add'=>'wishlist/add',
    'wishlist/getSessionWishlist'=>'wishlist/getSessionWishlist',
    'wishlist/getSessionWishlistProducts'=>'wishlist/getSessionWishlistProducts',

    'cities/getAll'=>'cities/getAll',

    'profile' => 'user/profile',

    'register' => 'user/register',
    'user/isloggedin' => 'user/actionIsLoggedIn',

    'user/login' => 'user/login',

    'user/confirm/([a-z 0-9]+)' => 'user/confirm/$1',
    
    'contact' => 'site/contacts',
    'candidate' => 'site/candidate',
    'vacancyDetails/([a-z A-Z 0-9]+)' => 'site/vacancyDetails/$1',
    'vacancies' => 'site/index',
    'projects' => 'site/projects',
    'services' => 'site/services', 
    'about' => 'site/about',
    'how-it-works'=>'site/about',

    'language/setLanguage'=>'language/setLanguage',
    'language/getLanguage'=>'language/getLanguage',

    '404'=>'site/notfound',

    'encode'=>'site/encode',

    '/' => 'site/index',
    '' => 'site/index',
);