var app = angular.module('geographic-video', ['onsen']);


/*
  初期設定
  Youtubeとgoogle系URLを許可
*/
app.config(function ($sceDelegateProvider) {

  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
    '**.google.com/**'
  ]);

});


/*
  ページ全体のcontroller
*/
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


/*
  リストのController
  いらんかもw
*/
app.controller('listCtrl', function($scope){



});


/*
  マップビュー用Controller
  GPS接続の許可・更新、マップ表示、班内判定など
*/
app.controller('mapCtrl', function($scope){

  // gv data
  var l = $scope.locations;

  var current = {
    lat: 0,
    lng: 0,
    accuracy: 10
  };

  // initialize google map by gMaps.js
  var map = new GMaps({
    div: '#map',
    lat: 138.21243,
    lng: 35.4123,
    zoom: 17
  });
  var distMarker = map.createMarker({
    lat: 138.21243,
    lng: 138.21243,
    infoWindow: {
      content: 'ここ!'
    }
  });

  map.addMarker(distMarker);

  ons.ready(function() {



    // GPSの設定 (成功時、エラー時、更新頻度などのオプション)
    var onSuccess = function(position){

      current.lat = position.coords.latitude;
      current.lng = position.coords.longitude;
      current.accuracy = position.coords.accuracy;

      var currentPosMarker = map.createMarker({
        lat: current.lat,
        lng: current.lng
      });

      map.setCenter(current.lat, current.lng, function(){
        map.removeMarkers();
        map.addMarker(distMarker);
        map.addMarker(currentPosMarker);
      });

      // if(distanceBetween(l, current)) $scope.showDialogToVideo();
    };

    var onError = function(message){
      alert("現在位置を取得できませんでした。GPS機能を有効にしてください");
    };

    var init = function() {
      if (typeof(navigator.geolocation) != 'undefined')
        setTimeout(navigator.geolocation.watchPosition(onSuccess, onError), 1000);
    };
    
    init();


    $scope.showDialogToVideo = function(){
      ons.createDialog('dialog_navi.html', {parentScope: $scope})
        .then(function(dialog) {
          dialog.show();
        });
    };
    $scope.goVideo = function() {
      // 位置情報の追跡を中止する
      navigator.geolocation.clearWatch(init);
      $scope.mapDialog.hide();
      $scope.mainNav.pushPage('video.html');
    };
  });

});


/*
  ビデオビューのController
  今探してる場所に合ったビデオを挿入
*/
app.controller('videoCtrl', function($scope){

  $scope.videoURL = 'https://www.youtube.com/embed/' + $scope.locations[$scope.distID].videoID + '?rel=0';

  $scope.backToTop = function() {
      var options = {
        animation: 'slide'
      };
      $scope.mainNav.resetToPage('list.html', options);
  }
});
