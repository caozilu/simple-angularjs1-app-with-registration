/**
 * @fileOverview
 * @author caozilu
 */
myApp.controller('RegistrationController', ['$scope', function($scope) {
  $scope.login = function() {
    $scope.message = '欢迎 ' + $scope.user.email + ' 回到我的应用';
  };
  $scope.register = function() {
    $scope.message = '欢迎 ' + $scope.user.email + ' 来到我的应用';
  };
}]);