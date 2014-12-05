angular.module('ngFancy')
  .controller('MobileCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {

    var pics = $localStorage.pics;
    if(pics.length !== 3){
      $location.path('/');
    }

    $scope.goNext = function () {
      if($scope.tel1 && $scope.tel2){

      }else{
        alert("请正确的填写双方手机号");
      }
    };
  }]);
