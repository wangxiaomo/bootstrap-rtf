angular.module('ngFancy')
  .controller('InfoCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {

    // TODO: 照片检测
    var totalCount = $localStorage.count,
        numCN = ['甲', '乙', '丙', '丁', '戊', '己'];

    $scope.numCN = numCN;
    $scope.counts = _.range(totalCount);

    var lockInput = function (i, e) {
      e.preventDefault();
      var card = $('md-card[data-card-id=' + i + ']');

      $(card).find('input').attr('readOnly', 'readOnly');
      $(card).find('button').text('已锁定').attr('disabled', 'disabled');
    };

    $scope.lockInput = lockInput;
    $scope.goNext = function () {
      var buttons = $('button:disabled');
      if(buttons.length !== 3){
        alert("请先锁定全部相关事故人信息!");
        return;
      }
    };
  }]);
