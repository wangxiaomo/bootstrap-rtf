angular.module('ngFancy').service('API', function($http, $q) {
  var getLoc = function () {
    var geolocation = new BMap.Geolocation(),
        defered = $q.defer();
    geolocation.getCurrentPosition(function(r) {
      defered.resolve(r);
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

  this.getLocData = function () {
    var defered = $q.defer();
    getLoc().then(function(r) {
      var point = r.point;
      getDecodedLoc(point).then(function(rs) {
        var district = rs && rs.province || '',
            loc = rs && rs.province + rs.city + rs.district + rs.street + rs.streetNumber || ''
        defered.resolve({
          lat: point.lat,
          lng: point.lng,
          district: district,
          loc: loc
        });
      });
    });
    return defered.promise;
  };

  this.sendEvent = function (event) {
    var defered = $q.defer();
    $http.post('/fancy/index.php?g=Api&m=wechat&a=add', event)
      .success(function(data) {
        defered.resolve(data);
      });
    return defered.promise;
  };

  this.search = function (id) {
    var defered = $q.defer();
    $http.post('/fancy/index.php?g=Api&m=wechat&a=search', {
      id: id
    }).success(function(data) {
      defered.resolve(data);
    });
    return defered.promise;
  };

  this.check = function(tel, cphm, sbdh) {
    var defered = $q.defer();
    $http.post('/fancy/index.php?g=Api&m=wechat&a=check_car', {
      tel: tel,
      cphm: cphm,
      clsbdh: sbdh
    }).success(function(data) {
      defered.resolve(data);
    });
    return defered.promise;
  };
});
