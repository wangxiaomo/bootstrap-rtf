angular.module('ngFancy')
  .controller('DetailCtrl', ['$scope', '$localStorage', '$location', '$routeParams', 'API', '$modal',
      function($scope, $localStorage, $location, $routeParams, API, $modal) {

    window.document.title = '事故详情';

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
        delete $localStorage.events[eventID];
        $('md-card.error').show();
      }
    });

    $scope.goSearch = function() {
      $location.path('/list');
    };

    $(document).on('click', '.thumb-img', function(e){
      var src = $(this).data('url');
      $('#overlay').show();
      var modalInstance = $modal.open({
        templateUrl: 'modal-alert',
        controller: 'ShowBigModalCtrl',
        backdrop: false,
        keyboard: false,
        size: 'lg',
        resolve: {
          modalImgSrc: function() { return src; }
        }
      });
    });
  }]);
