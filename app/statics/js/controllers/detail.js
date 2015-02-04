angular.module('ngFancy')
  .controller('DetailCtrl', ['$scope', '$localStorage', '$location', '$routeParams', 'API',
      function($scope, $localStorage, $location, $routeParams, API) {

    var params = $routeParams,
        eventID = params.eventID;

    API.search(eventID).then(function(data){
      if(data.r == 1){
        $scope.event = data.msg.event;
        if($scope.event.role) {
          $scope.center = FANCY_CENTERS[$scope.event.role];
        }else{
          $scope.fallback = true;
        }
      }else{
        $('md-card.error').show();
      }
    });

    $scope.goSearch = function() {
      $location.path('/list');
    };
  }]);
