var gvApp = angular.module('geographicVideo', ['ionic']);

/*
gvApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {url: "/main", abstract: true, templateUrl: "main.html"})
    .state('main.top', {url: '/top', views: {'menuContent': {templateUrl: 'top.html', controller: 'topCtrl'} }  })
    .state('main.navi', {url: '/navi', views: {'menuContent': {templateUrl: 'naviView.html', controller: 'nanviCtrl'} }  })
    .state('main.video', {url: '/video', views: {'menuContent': {templateUrl: 'videoView.html', controller: 'videoCtrl'} }  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main/top');
}]);
*/

gvApp.controller('mainCtrl', function($scope, $ionicActionSheet, $timeout){

  $scope.items = [
    {title: 'タイトルその1'},
    {title: 'タイトルその2'},
    {title: 'タイトルその3'},
    {title: 'タイトルその4'},
    {title: 'タイトルその5'},
    {title: 'タイトルその6'}
  ];


  // Triggered on a button click, or some other target
  $scope.show = function(index) {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '探しに行く！' }
     ],
     titleText: $scope.items[index].title,
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
     },
     buttonClicked: function(index) {
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

  };

});