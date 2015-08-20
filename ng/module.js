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

  var map = new GMaps({
    div: "#map",
    lat: 35.710285,
    lng: 139.77714,
    zoom: 15
  });

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