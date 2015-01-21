angular.module('ngFancy')
  .controller('InfoCtrl', ['$scope', '$localStorage', '$location', '$q', 'API', function($scope, $localStorage, $location, $q, API) {

    API.getLocData().then(function(d){
      console.log(d);
    });

    var pics = $localStorage.pics,
        totalCount = $localStorage.count,
        numCN = ['甲', '乙', '丙', '丁', '戊', '己'];

    if(_.isUndefined(pics) || _.isUndefined(totalCount) || pics.length < 3 || totalCount < 2 || totalCount > 5){
      $location.path('/');
    }

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
      if(buttons.length !== totalCount){
        alert("请先锁定全部相关事故人信息!");
        return;
      }else{
        $location.path('/done');
      }
    };
  }]);
