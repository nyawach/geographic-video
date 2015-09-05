(function(){

'use strict';

var app = angular.module('geographic-video', ['onsen']);


app.controller('listCtrl', ['$scope', '$http', function($scope, $http){

  $http.get('./data/location.json')
    .success(function(data, status, headers, config) {
      $scope.locations = data;
    });

  ons.ready(function() {
    $scope.showDialog = function(i){
      ons.createDialog('dialog.html', {parentScope: $scope}).then(function(dialog) {
        $scope.dialog = dialog;
        $scope.distName = $scope.locations[i].name;
        dialog.show();
      });
    $scope.goMap = function() {
      $scope.listNav.pushPage('map.html');
      $scope.naviDialog.hide();
    };
    };
  });

}]);

app.controller('mapCtrl', ['$scope', function($scope){
}]);


})();