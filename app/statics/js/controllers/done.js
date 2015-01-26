angular.module('ngFancy')
  .controller('DoneCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {
    
    $scope.event = $localStorage.events[$localStorage.lastEventID];

    $scope.goHome = function () {
      delete $localStorage.lastEventID;
      $location.path('/');
    };
  }]);
