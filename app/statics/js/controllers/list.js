angular.module('ngFancy')
  .controller('ListCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {

    $scope.events = $localStorage.events;

    $scope.showDetail = function (eventID) {
      $location.path('/detail/' + eventID);
    };
  }]);
