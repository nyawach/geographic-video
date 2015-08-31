var gvApp = angular.module('geographicVideo', ['ionic']);


gvApp.config(function($stateProvider, $urlRouterProvider) {
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
    });
    // .state('main.video', {
    //   url: '/video',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'videoView.html',
    //       controller: 'videoCtrl'
    //     }
    //   }
    // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});




gvApp.controller('naviCtrl', function($scope, $ionicPopup, $ionicLoading, $compile){

  var destData = $scope.locations[$scope.activeLocationIndex];
  var currentPos = {
        lat: 33.560942,
        lng: 130.430419
      },
      destPos = {
        lat: destData.lat,
        lng: destData.lng
      };

  var currentPos = {
        lat: 33.560942,
        lng: 130.430419
      },
      destPos = {
        lat: 33.560001,
        lng: 130.429138
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
    currentPos.lat += 0.0001;
    currentPos.lng = 130.430409;

    // update current geolocation value with geolocation API
    GMaps.geolocate({

      success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude);
        currentPos.lat = position.coords.latitude;
        currentPos.lng = position.coords.longitude;
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

  };


  // set interval and init
  updateRoute();
  setInterval(updateRoute, 3000);

});





gvApp.controller('mainCtrl', ['$scope', '$http', '$ionicPopup', '$timeout', '$state', function($scope, $http, $ionicPopup, $timeout, $state){


  $http.get('data/location.json')
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


