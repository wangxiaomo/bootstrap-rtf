angular.module('ngFancy')
  .controller('DetailCtrl', ['$scope', '$localStorage', '$location', '$routeParams',
      function($scope, $localStorage, $location, $routeParams) {

    var params = $routeParams,
        eventID = params.eventID,
        event = $localStorage.events[eventID];

    $scope.event = event;
  }]);
