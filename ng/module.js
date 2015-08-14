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


gvApp.controller('naviCtrl', function($scope, $ionicPopup, $ionicLoading, $compile){

  function initialize() {
    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
    
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);
    
    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

});

gvApp.controller('mainCtrl', function($scope, $ionicPopup, $timeout){

  $scope.items = [
    {title: 'タイトルその1'},
    {title: 'タイトルその2'},
    {title: 'タイトルその3'},
    {title: 'タイトルその4'},
    {title: 'タイトルその5'},
    {title: 'タイトルその6'}
  ];


  // A confirm dialog
  $scope.showConfirm = function(index) {

    var confirmPopup = $ionicPopup.confirm({
      title: $scope.items[index].title,
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


});