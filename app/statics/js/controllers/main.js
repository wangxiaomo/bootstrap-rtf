angular.module('ngFancy')
  .controller('MainCtrl', ['$scope', '$modal', function($scope, $modal) {

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
      $scope.showModal();
    };
  }]);

angular.module('ngFancy')
  .controller('MainModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.dismiss = function () {
      $modalInstance.dismiss('cancel');
      $('#overlay').hide();
    };
  }]);
