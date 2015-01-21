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
});
