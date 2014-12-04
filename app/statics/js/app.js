angular.module('ngFancy', ['ngRoute', 'ui.bootstrap'])
  .config(['$routeProvider', function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'UploadCtrl'
      });
  }]);
