

var app = angular.module('geographic-video', ['onsen']);


app.controller('mainCtrl', function($scope, $http){

  $http.get('./data/location.json')
    .success(function(data, status, headers, config) {
      $scope.locations = data;
    });

  ons.ready(function() {
    $scope.showDialog = function(i){
      ons.createDialog('dialog.html', {parentScope: $scope}).then(function(dialog) {
        $scope.distName = $scope.locations[i].name;
        $scope.distID = i;
        dialog.show();
      });
    };
    $scope.goMap = function() {
      $scope.mainNav.pushPage('map.html');
      $scope.naviDialog.hide();
    };
  });

});


app.controller('listCtrl', function($scope){



});


app.controller('mapCtrl', function($scope, $timeout){

$timeout(function(){
  
  var l = $scope.locations[$scope.distID];

  var current = {
    lat: 33.562001,
    lng: 130.430419
  };

  var map = new GMaps({
    div: '#map',
    lat: current.lat,
    lng: current.lng,
    zoom: 17
  });


  var onSuccess = function(position){
    var lat = position.coords.latitude,
        lng = position.coords.longitude;
    current.lat = lat;
    current.lng = lng;
    map.setCenter(lat, lng, function(){
      map.addMarker({lat: lat, lng: lng});
    });
  };
  var onError = function(message){
    alert("現在位置を取得できませんでした。");
  };
  var option = {
    frequency: 5000,
    timeout: 6000
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError, option);


  var distMarker = map.createMarker({
    lat: l.lat,
    lng: l.lng
  });

  map.addMarker(distMarker);

}, 300);

});
