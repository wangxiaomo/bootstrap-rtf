angular.module('ngFancy')
  .controller('ListCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {
    window.document.title = '事故列表';

    $scope.events = _.sortBy(_.values($localStorage.events), function(v) {
      return v.date;
    }).reverse();

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
