var gvApp = angular.module('geographicVideo', ['ionic']);


gvApp.config(function($sceDelegateProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'index.html',
      cache: false
    })
    .state('navi', {
      url: '/navi',
      templateUrl: 'navi.html',
      cache: false
    })
    .state('video', {
      url: '/video',
      templateUrl: 'video.html',
      cache: false
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

  // add youtube URLs to whitelist
  $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'), '*//maps.google.com/*']);
});




gvApp.controller('naviCtrl', function($scope, $ionicPopup, $ionicLoading, $state, $compile){

  var destData = $scope.locations[$scope.activeLocationIndex];
  var currentPos = {
        lat: 33.560942,
        lng: 130.430419
      },
      destPos = {
        lat: destData.lat,
        lng: destData.lng
      };

  /* init google maps API with gmaps.js */
  var map = new GMaps({
    div: "#map",
    lat: currentPos.lat,
    lng: currentPos.lng,
    zoom: 17
  });


  /* update map markers and map route */
  var updateRoute = function() {

    // clear map route and markers
    map.removeMarkers();
    map.cleanRoute();

    // update current geolocation value (for test)
    currentPos.lat += 0.0005;
    currentPos.lng = 130.430409;

    // update current geolocation value with geolocation API
    GMaps.geolocate({

      success: function(position) {
        // map.setCenter(position.coords.latitude, position.coords.longitude);
        // currentPos.lat = position.coords.latitude;
        // currentPos.lng = position.coords.longitude;
      },

      error: function(error) {
        //エラーコードのメッセージを定義
        var errorMessage = {
          0: "原因不明のエラーが発生しました…。",
          1: "位置情報の取得が許可されませんでした…。",
          2: "電波状況などで位置情報が取得できませんでした…。",
          3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。",
        };

        //エラーコードに合わせたエラー内容をアラート表示
        alert(errorMessage[error.code]);
      },

      not_supported: function() {
        alert("Your browser does not support geolocation");
      },

      always: function() {
      }

    });


    // add current position
    map.addMarkers([{
      lat: currentPos.lat,
      lng: currentPos.lng
    }, {
      lat: destPos.lat,
      lng: destPos.lng
    }]);

    // redraw route to next destination
    map.drawRoute({
      origin: [currentPos.lat, currentPos.lng],
      destination: [destPos.lat, destPos.lng],
      travelMode: 'walking',
      strokeColor: '#ff9100',
      strokeOpacity: 0.6,
      strokeWeight: 5
    });

    // within range
    if(isOn(currentPos, destPos)) {
      
      clearInterval(update);
      
      $ionicPopup.confirm({
        title: '動画を発見！',
        template: '動画を見てみますか?'
      }).then(function(res) {
        if(res) {
          $scope.videoURL = 'https://www.youtube.com/embed/' + $scope.locations[$scope.activeLocationIndex].videoID;
          $state.go('video');
        } else {
          setInterval(updateRoute, 3000);
          console.log('You are not sure');
        }
      });
    }


  };


  var isOn = function(pos, dist) {
    var range = 10;
    return getDistance(pos, dist) < range;
  };
  //距離の計算//
  function getDistance(pos, dist) {
    function radians(deg) {return deg * Math.PI / 180;}
    return 6378140 * Math.acos(Math.cos(radians(pos.lat))* Math.cos(radians(dist.lat))* Math.cos(radians(dist.lng) - radians(pos.lng))+ Math.sin(radians(pos.lat)) * Math.sin(radians(dist.lat)));
  }

  // set interval and init
  updateRoute();
  var update = setInterval(updateRoute, 3000);


});





gvApp.controller('mainCtrl', ['$scope', '$http', '$ionicPopup', '$timeout', '$state', function($scope, $http, $ionicPopup, $timeout, $state){


  $http.get('./data/location.json')
    .success(function(data, status, headers, config) {
      $scope.locations = data;
    });

  // A confirm dialog
  $scope.showConfirm = function(index) {

    var confirmPopup = $ionicPopup.confirm({
      title: $scope.locations[index].name,
      template: 'この場所へ行ってみますか？'
    });

    confirmPopup.then(function(res) {
      if(res) {
        $scope.activeLocationIndex = index;
        $state.go('navi');
      } else {
        console.log('You are not sure');
      }

    });

  };


}]);


gvApp.controller('videoCtrl', function($scope, $ionicPopup, $state){

  console.log($scope.videoURL);
  $scope.go = function(path) {
    $state.go(path);
  };

});
