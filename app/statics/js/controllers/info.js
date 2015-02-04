angular.module('ngFancy')
  .controller('InfoCtrl', ['$scope', '$localStorage', '$location', 'API',
      function($scope, $localStorage, $location, API) {

    var pics = $localStorage.pics,
        totalCount = $localStorage.count,
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

    var lockInput = function (i, e) {
      e.preventDefault();
      var card = $('md-card[data-card-id=' + i + ']');

      var tel = $.trim($(card).find('input[name=tel]').val()),
          cphm = $.trim($(card).find('input[name=cphm]').val()),
          sbdm = $.trim($(card).find('input[name=sbdm]').val());
      API.check(tel, cphm, sbdm).then(function(data){
        if(data.r == 1){
          $(card).find('input').attr('readOnly', 'readOnly');
          $(card).find('button').text('已锁定').attr('disabled', 'disabled');
        }else{
          alert(data.msg);
        }
      });
    };

    $scope.lockInput = lockInput;
    $scope.goNext = function () {
      var buttons = $('button:disabled');
      if(buttons.length !== totalCount){
        alert("请先锁定全部相关事故人信息!");
        return;
      }else{
        $('#overlay').show().loadingOverlay();

        var users = [],
            cards = $('md-card');
        _.each(cards, function(o) {
          users.push({
            tel: $.trim($(o).find('input[name=tel]').val()),
            cphm: $.trim($(o).find('input[name=cphm]').val()),
            sbdh: $.trim($(o).find('input[name=sbdm]').val()),
            insurance: $.trim($(o).find('input[name=bxgs]').val())
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
      }
    };
  }]);
