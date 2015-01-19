angular.module('ngFancy', ['ngRoute', 'ngStorage', 'ui.bootstrap', 'angular-loading-bar'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/mobile', {
        templateUrl: 'views/mobile.html',
        controller: 'MobileCtrl'
      })
      .when('/done', {
        templateUrl: 'views/done.html',
        controller: 'DoneCtrl'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/detail/:eventID', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      });
  }]);