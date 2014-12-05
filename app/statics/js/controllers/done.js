angular.module('ngFancy')
  .controller('DoneCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {
    
    var lastEvent = $localStorage.lastEvent;
    if(!lastEvent){
      $location.path('/');
    }

    $scope.event = $localStorage.events[lastEvent];

    $scope.goHome = function () {
      delete $localStorage.lastEvent;
      $location.path('/');
    };
  }]);
