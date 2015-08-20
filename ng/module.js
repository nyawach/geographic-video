var gvApp = angular.module('geographicVideo', ['ionic']);


gvApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'index.html'
    })
    .state('navi', {
      url: '/navi',
      templateUrl: 'navi.html'
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

gvApp.factory('jsonData', function($http){
  return {
    getData: function() {
      return $http.get('data/location.json')
        .success(function(data, status, headers, config) {
          return data;
        });
    }
  }
});

gvApp.controller('naviCtrl', function($scope, $ionicPopup, $ionicLoading, $compile){

  var currentPos = {
        lat: 33.560942,
        lng: 130.430419
      },
      destPos = {
        lat: 33.560001,
        lng: 130.429138
      };
/*
  var currentPos = {
        lat: 33.560942,
        lng: 130.430419
      },
      destPos = {
        lat: 33.560001,
        lng: 130.429138        
      };
*/
  // init google maps API with gmaps.js
  var map = new GMaps({
    div: "#map",
    lat: currentPos.lat,
    lng: currentPos.lng,
    zoom: 17
  });

  // add current position
  map.addMarker({
    lat: currentPos.lat,
    lng: currentPos.lng
  });

  var updateRoute = function() {

    // update current geolocation
    currentPos.lat += 0.0001;
    currentPos.lng = 130.430409;

    // redraw route to next destination
    map.cleanRoute();
    map.drawRoute({
      origin: [currentPos.lat, currentPos.lng],
      destination: [destPos.lat, destPos.lng],
      travelMode: 'walking',
      strokeColor: '#ff9100',
      strokeOpacity: 0.6,
      strokeWeight: 5
    });
  };

  updateRoute();
  setInterval(updateRoute, 3000);

});





gvApp.controller('mainCtrl', ['$scope', '$http', '$ionicPopup', '$timeout', function($scope, $http, $ionicPopup, $timeout){


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
        location.href = '/#/navi';
        $scope.activeLocationIndex = index;
      } else {
        console.log('You are not sure');
      }

    });

  };


}]);


