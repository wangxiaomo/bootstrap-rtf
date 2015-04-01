angular.module('ngFancy')
  .controller('StartCtrl', ['$scope', '$modal', '$location', function($scope, $modal, $location) {
    window.document.title = '轻微事故快处';

    var getHour = function () {
      var date = new Date();
      return date.getHours();
    };

    $scope.showModal = function () {
      $('#overlay').show();
      var modalInstance = $modal.open({
        templateUrl: 'modal-alert',
        controller: 'StartModalCtrl',
        backdrop: false,
        keyboard: false,
        size: 'lg',
      });
    };

    $scope.showModal2 = function () {
      $('#overlay').show();
      var modalInstance = $modal.open({
        templateUrl: 'modal-alert2',
        controller: 'StartModalCtrl',
        backdrop: false,
        keyboard: false,
        size: 'lg',
      });
    };

    $scope.goHash = function (hash) {
      $location.path(hash);
    };

    $scope.go = function () {
      var cntHour = getHour();
      if(cntHour < 7 || cntHour > 20){
        $scope.showModal();
      }else{
        $location.path('/count')
      }
    };
  }]);

angular.module('ngFancy')
  .controller('StartModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.dismiss = function () {
      $modalInstance.dismiss('cancel');
      $('#overlay').hide();
    };
  }]);
