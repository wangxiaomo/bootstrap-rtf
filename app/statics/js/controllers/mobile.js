angular.module('ngFancy')
  .controller('MobileCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {

    var pics = $localStorage.pics;
    if(pics.length !== 3){
      $location.path('/');
    }

  }]);
