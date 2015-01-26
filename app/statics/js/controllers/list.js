angular.module('ngFancy')
  .controller('ListCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {

    $scope.events = $localStorage.events;

    var goDetail = function (id) {
      $location.path('/detail/' + id);
    };

    $scope.showDetail = function (eventID) {
      goDetail(eventID);
    };

    $scope.search = function () {
      var eventID = $.trim($('input[name=eventID]').val());
      goDetail(eventID);
    };
  }]);
