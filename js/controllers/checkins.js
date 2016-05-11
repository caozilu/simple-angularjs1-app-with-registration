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

    $scope.order = 'name';
    $scope.direction = null;
    $scope.query = '';
    $scope.recordId = '';

    $scope.addCheckin = function() {
      checkinsList.$add({
        name: $scope.user.name,
        email: $scope.user.email,
        date: Firebase.ServerValue.TIMESTAMP
      }).then(function(){
        $location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
      });
    };

    $scope.deleteCheckin = function(id){
      var refDel = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + id);
      var record = $firebaseObject(refDel);
      record.$remove(id);
    };

    $scope.pickRandom = function() {
      var whichRecord = Math.round(Math.random()*(checkinsList.length-1));
      $scope.recordId = checkinsList.$keyAt(whichRecord);
    };

    $scope.showLove = function(myChekin) {
      myChekin.show = !myChekin.show;
      if (myChekin.userState == 'expanded') {
        myChekin.userState = '';
      } else {
        myChekin.userState = 'expanded';
      }
    };

    $scope.giveLove = function(mycheckin, myGift){
      var refLove = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + mycheckin.$id + '/awards');
      var checkinsArray = $firebaseArray(refLove);
      checkinsArray.$add({
        name: myGift,
        date: Firebase.ServerValue.TIMESTAMP
      });
    };

    $scope.deleteLove = function(checkinId, award){
      var refLove = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser + '/meetings/' + $scope.whichmeeting + '/checkins/' + checkinId + '/awards');
      var record = $firebaseObject(refLove);
      record.$remove(award);
    }

  }]);