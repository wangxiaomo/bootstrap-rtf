angular.module('ngFancy', ['ngRoute', 'ngStorage', 'ui.bootstrap', 'angular-loading-bar'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl'
      })
      .when('/count', {
        templateUrl: 'views/count.html',
        controller: 'CountCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      })
      .when('/info', {
        templateUrl: 'views/info.html',
        controller: 'InfoCtrl'
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
      })
      .when('/doc', {
        templateUrl: 'views/doc.html',
        controller: 'DocCtrl'
      });
  }]);
