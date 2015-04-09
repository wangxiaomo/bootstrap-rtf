angular.module('ngFancy').service('API', ['$http', '$q', function($http, $q) {
  this.getLoc = function () {
    var geolocation = new BMap.Geolocation(),
        defered = $q.defer();
    geolocation.getCurrentPosition(function(r) {
      defered.resolve({
        status: this.getStatus(),
        lat: r.point.lat,
        lng: r.point.lng
      });
    }, {enableHighAccuracy: true});
    return defered.promise;
  };

  var getDecodedLoc = function (r) {
    var defered = $q.defer();
        geoc = new BMap.Geocoder();
    geoc.getLocation(r.point, function(rs) {
      defered.resolve(rs);
    });
    return defered.promise;
  };

  var post = function(url, params) {
    var deferred = $q.defer();
    $http.post(url, params)
      .success(function(data) {
        deferred.resolve(data);
      });
    return deferred.promise;
  };

  this.sendEvent = function (event) {
    return post('/fancy/index.php?g=Api&m=wechat&a=add', event);
  };

  this.search = function (id) {
    return post('/fancy/index.php?g=Api&m=wechat&a=search', {
      id: id
    });
  };

  this.check = function(tel, cphm, sbdh) {
    return post('/fancy/index.php?g=Api&m=wechat&a=check_car', {
      tel: tel,
      cphm: cphm,
      clsbdh: sbdh
    });
  };
}]);
