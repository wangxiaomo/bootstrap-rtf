angular.module('ngFancy')
  .controller('MobileCtrl', ['$scope', '$localStorage', '$location', function($scope, $localStorage, $location) {

    var pics = $localStorage.pics;
    if(pics.length !== 3){
      $location.path('/');
    }

    var getUniqID = function () {
      return parseInt((new Date()).valueOf()/10000000000);
    };

    $scope.goNext = function () {
      if($scope.tel1 && $scope.tel2){
        if($scope.tel1 == $scope.tel2){
          alert("请不要填写相同的手机号");
          return false;
        }
        // api: build accident data
        $localStorage.events = $localStorage.events || {};
        var eventID = 'ID' + $scope.tel1 + getUniqID();
        $localStorage.lastEvent = eventID;
        $localStorage.events[eventID] = {
          id: eventID,
          tel1: $scope.tel1,
          tel2: $scope.tel2,
          pics: pics
        };
        delete $localStorage.pics;
        $location.path('/done');
      }else{
        alert("请正确的填写双方手机号");
      }
    };
  }]);
