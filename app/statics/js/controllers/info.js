angular.module('ngFancy')
  .controller('InfoCtrl', ['$scope', '$localStorage', '$location', 'API',
      function($scope, $localStorage, $location, API) {

    window.document.title = '输入事故方信息';

    var pics = $localStorage.pics,
        totalCount = $localStorage.count,
        lockedCars = [],
        numCN = ['甲', '乙', '丙', '丁', '戊', '己'];

    if(_.isUndefined(pics) || _.isUndefined(totalCount) || pics.length < 3 || totalCount < 2 || totalCount > 5){
      $location.path('/');
    }

    $scope.numCN = numCN;
    $scope.counts = _.range(totalCount);

    var getLocData = function(cb) {
      if(!$localStorage.loc) {
        API.getLocData().then(function(r) {
          $localStorage.loc = r;
          cb && cb();
        });
      }else{
        cb && cb();
      }
    };
    getLocData();

    var isMobile = function(v) {
      return /\d{11}/.test(v);
    };
    var isCPHM = function(v) {
      return /\w{6}/.test(v);
    };
    var checkFormValid = function() {
      var telsInput = $('input[name=tel]'),
          telsVal = _.map(telsInput, function(i) {
            return $(i).val();
          }),
          telsFlag = _.map(telsVal, isMobile),
          cphmInput = $('input[name=cphm]'),
          cphmVal = _.map(cphmInput, function(i) {
            return $(i).val();
          }),
          cphmFlag = _.map(cphmVal, isCPHM);

      if(!_.every(telsFlag)){
        alert("请正确填写手机号码!");
        return false;
      }
      if(_.union(telsVal).length !== totalCount){
        alert("请不要填写重复的手机号码!");
        return false;
      }
      if(!_.every(cphmFlag)){
        alert("请正确填写车牌号码!");
        return false;
      }
      if(_.union(cphmVal).length !== totalCount){
        alert("请不要填写重复的车辆!");
        return false;
      }
      return true;
    };

    $scope.goNext = function () {
      if(checkFormValid() === false){
        return;
      }

      $('#overlay').show().loadingOverlay();

      var users = [],
          cards = $('md-card');
      _.each(cards, function(o) {
        users.push({
          tel: $.trim($(o).find('input[name=tel]').val()),
          cphm: $.trim($(o).find('input[name=cphm]').val()),
          sbdh: '',
          insurance: $.trim($(o).find('select').val())
        });
      });

      // API 插入信息, 返回事故
      getLocData(function(){
        var event = {
          loc: $localStorage.loc,
          imgs: $localStorage.pics,
          count: $localStorage.count,
          users: users
        };
        API.sendEvent(event).then(function(d) {
          $('#overlay').loadingOverlay('remove').hide();
          if(d.r == 1){
            event.sgbh = d.msg.sgbh;
            event.role = d.msg.role;
            event.date = (new Date()).toLocaleDateString();
            $localStorage.lastEventID = event.sgbh;
            $localStorage.events = $localStorage.events || {};
            $localStorage.events[$localStorage.lastEventID] = event;

            delete $localStorage.count;
            delete $localStorage.pics;
            delete $localStorage.loc;

            $location.path('/done');
          }else{
            alert("啊哦，不知道为什么出错了，请重新试一次");
            return false;
          }
        });
      });
    };
  }]);
