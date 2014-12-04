angular.module('ngFancy')
  .controller('MainCtrl', ['$scope', '$modal', function($scope, $modal) {

    var getHour = function () {
      var date = new Date();
      return date.getHours();
    };

    $scope.showModal = function () {
      $('#overlay').show();
      var modalInstance = $modal.open({
        templateUrl: 'modal-alert',
        controller: 'MainModalCtrl',
        backdrop: false,
        keyboard: false,
        size: 'lg',
      });
    };

    $scope.go = function () {
      var cntHour = getHour();
      if(cntHour < 7 || cntHour > 20){
        $scope.showModal();
      }else{
        alert("跳转");
      }
    };
  }]);

angular.module('ngFancy')
  .controller('MainModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.dismiss = function () {
      $modalInstance.dismiss('cancel');
      $('#overlay').hide();
    };
  }]);
