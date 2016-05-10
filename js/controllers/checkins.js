/**
 * @fileOverview
 * @author caozilu
 */
myApp.controller('CheckInsController', ['$scope', '$rootScope', '$location', '$firebaseObject', '$firebaseArray', '$routeParams', 'FIREBASE_URL',
  function($scope, $rootScope, $location, $firebaseObject, $firebaseArray, $routeParams, FIREBASE_URL) {

    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    var ref = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins');

    var checkinsList = $firebaseArray(ref);
    $scope.checkins = checkinsList;

    $scope.addCheckin = function() {
      var checkinsInfo = $firebaseArray(ref);
      var myData = {
        name: $scope.user.name,
        email: $scope.user.email,
        date: Firebase.ServerValue.TIMESTAMP
      };

      checkinsInfo.$add(myData).then(function(){
        $location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
      });
    };

  }]);