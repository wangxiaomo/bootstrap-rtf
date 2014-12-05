angular.module('ngFancy')
  .controller('UploadCtrl', ['$scope', '$modal', function($scope, $modal) {

    $scope.showBig = function (index) {
      $('#overlay').show();

      var modalImgSrc = "statics/images/p" + index + "-large.jpg";
      var modalInstance = $modal.open({
        templateUrl: 'modal-alert',
        controller: 'ShowBigModalCtrl',
        backdrop: false,
        keyboard: false,
        size: 'lg',
        resolve: {
          modalImgSrc: function() { return modalImgSrc; }
        }
      });
    };
  }]);

angular.module('ngFancy')
  .controller('ShowBigModalCtrl', ['$scope', '$modalInstance', 'modalImgSrc', function($scope, $modalInstance, modalImgSrc) {
    $scope.modalImgSrc = modalImgSrc;
    $scope.dismiss = function () {
      $modalInstance.dismiss('cancel');
      $('#overlay').hide();
    };
  }]);
