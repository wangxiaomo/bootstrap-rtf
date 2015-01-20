angular.module('ngFancy')
  .controller('CountCtrl', ['$scope', '$localStorage', '$location', '$routeParams',
      function($scope, $localStorage, $location, $routeParams) {

    $scope.i = 2;

    $scope.add = function () {
      if($scope.i >= 5) {
        alert("事故车辆至多为5");
        return;
      }
      $scope.i += 1;
    };

    $scope.minus = function () {
      if($scope.i <= 2) {
        alert("事故车辆至少为2");
        return;
      }
      $scope.i -= 1;
    };

    $scope.goTakePhoto = function () {
      $localStorage.count = $scope.i;
      $location.path('/upload');
    };
  }]);
