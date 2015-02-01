angular.module('ngFancy')
  .controller('DoneCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {
    
    try {
      $scope.event = $localStorage.events[$localStorage.lastEventID];
    }catch (error) {
      $location.path('/');
    }

    if($scope.event.role) {
      $scope.center = FANCY_CENTERS[$scope.event.role];
    }else{
      $scope.fallback = true;
    }

    $scope.goHome = function () {
      delete $localStorage.lastEventID;
      $location.path('/');
    };
  }]);
