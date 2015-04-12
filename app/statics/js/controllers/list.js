angular.module('ngFancy')
  .controller('ListCtrl', ['$scope', '$localStorage', '$location', 'API', function($scope, $localStorage, $location, API) {
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
      var data = $.trim($('input[name=eventID]').val());
      API.searchEvent(data).then(function(d){
        if(d.r == 1){
          $scope.events = d.msg.event;
        }else{
          $scope.events = [];
        }
      });
    };
  }]);
