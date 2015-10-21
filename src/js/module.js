var app = angular.module('geographic-video', ['onsen', 'ngResource']);


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
app.controller('mainCtrl', function($scope){



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
app.controller('mapCtrl', ['$scope', '$resource', function($scope, $resource){

// JSONファイル読み込んでから全部実行
var data = $resource('./data/location.json').query(function(d){

  $scope.locations = d;

  // initialize google map by gMaps.js
  var map = new GMaps({
    div: '#map',
    lat: 33.6308835,
    lng: 130.527575,
    zoom: 12
  });



  ons.ready(function() {

    // RANGE(m)範囲内の記憶情報を表示させる
    var RANGE = 150;
    var RANGE_AROUND = 800;
    var currentPosMarker = {};
    var memories = [];

    for( var i = 0; i < $scope.locations.length; i++ ) {

      memoryData = $scope.locations[i];

      memories[i] = map.createMarker({
        lat: memoryData.lat,
        lng: memoryData.lng,
        visible: false,
        clickable: false,
        icon: 'images/icon_memory.png',
        infoWindow: {
          content: '<a href="https://www.youtube.com/watch?v='
            + memoryData.videoID
            + '" target="_blank"><img src="images/icon_video.png"></a>'
        }
      });

    }


    // GPSの設定 (成功時、エラー時、更新頻度などのオプション)
    var onSuccess = function(position){

      currentPosMarker.setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });

      showNearbyObjects();

    };
    function showNearbyObjects() {
      for(var i = 0; i < memories.length; i++) {
        if( isNearBy(memories[i]) ) {
          memories[i].setOptions({
            visible: true,
            clickable: true,
            opacity: 1.0,
          });
        }
        else if( isAround(memories[i]) ) {
          memories[i].setOptions({
            visible: true,
            opacity: 0.4
          });
        }
      }
    }
    function isNearBy(m) {
      var from = currentPosMarker.getPosition();
      var to = m.getPosition();
      var distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      return (distance < RANGE);
    }
    function isAround(m) {
      var from = currentPosMarker.getPosition();
      var to = m.getPosition();
      var distance = google.maps.geometry.spherical.computeDistanceBetween(from, to);
      return (distance < RANGE_AROUND);
    }

    var onError = function(message){
      alert("現在位置を取得できませんでした。GPS機能を有効にしてください");
    };

    var init = function() {

      // 現在地マーカーの作成・追加
      navigator.geolocation.getCurrentPosition(function(position) {

        currentPosMarker = map.createMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          infoWindow: {
            content: '現在位置です'
          }
        });
        map.addMarker(currentPosMarker);
        map.addMarkers(memories);
        // console.log(memories);


      }, onError);

      // 現在地更新用タイマーのセット
      if (typeof(navigator.geolocation) != 'undefined')
        navigator.geolocation.watchPosition(onSuccess, onError);

    };

    init();


    $scope.centerMe = function() {
    /* 移動先の位置座標となるLatLngクラス(マーカーと同じ位置座標) */

    /* 中心座標を移動する */
    map.setCenter( latlng );
    };

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
    };


  });

});
// $resource 終


}]);


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
