angular.module('ngFancy')
  .controller('UploadCtrl', ['$scope', '$localStorage', '$location', '$modal', function($scope, $localStorage, $location, $modal) {

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

    $('#hidden-input').fileupload({
      dataType: 'json',
      disableImageResize: false,
      url: 'http://www.sxgajj.gov.cn/web/index.php/Weixin/upload',
      maxFileSize: 5000000,
      acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
      start: function(e) {
        $('#overlay').show().loadingOverlay();
      },
      done: function(e, data) {
        var files = data.result.files;
        if(files.length > 0){
          var file = files[0],
              cntSnapLabel = 'snap_p' + $scope.cntSnapIndex,
              nextBlockIndex = $scope.cntSnapIndex + 1,
              url = file.url,
              thumbUrl = file.thumbnailUrl;
          $('#p' + $scope.cntSnapIndex + '-img').attr('src', 'http://www.sxgajj.gov.cn' + thumbUrl);
          $('#p' + $scope.cntSnapIndex + '-data-url').val(url);
          $('#p' + $scope.cntSnapIndex + '-data-thumb').val(thumbUrl);
          $('.btn-groups-' + nextBlockIndex).find('button').removeClass('btn-disable');  
        }

        $('#overlay').loadingOverlay('remove').hide();
      },
    });

    $scope.snap = function (index) {
      var btnGroups = $('.btn-groups-' + index),
          btnSnap = btnGroups.find('.btn-snap-photo');
      if(btnSnap.hasClass('btn-disable')){
        return false;
      }

      $scope.cntSnapIndex = index;
      $('#hidden-input').trigger('click');
    };

    $scope.goNext = function () {
      var pics = [];
      _.map([1,2,3], function(i){
        pics.push({
          url: $('#p' + i + '-data-url').val(),
          thumb: $('#p' + i + '-data-thumb').val()
        });
      });
      pics = _.filter(pics, function(v){
        return v.url != '';
      });;
      if(pics.length !== 3){
        $('#overlay').show();
        var modalInstance = $modal.open({
          templateUrl: 'modal-submit-alert',
          controller: 'MainModalCtrl',
          backdrop: false,
          keyboard: false,
          size: 'lg',
        });
      }else{
        $localStorage['pics'] = pics;
        $location.path('/mobile');
      }
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
