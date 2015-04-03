angular.module('ngFancy')
  .controller('DocCtrl', ['$scope', '$localStorage', '$location', '$routeParams',
    function($scope, $localStorage, $location, $routeParams) {
      $scope.goHome = function() {
        $location.path('/');
      };
  }]);
