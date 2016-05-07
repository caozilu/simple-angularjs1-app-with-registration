/**
 * @fileOverview
 * @author caozilu
 */
myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', '$location', function($rootScope, $firebaseAuth, $firebaseObject, FIREBASE_URL, $location) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authUser){
    if (authUser){
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  var myObj = {
    login: function(user){
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser){
        $location.path('/success');
      }).catch(function(error){
        $rootScope.message = error.message;
      });
      $rootScope.message = '欢迎 ' + user.email + ' 回到我的应用';
    },

    logout: function(){
      auth.$unauth();
    },

    requireAuth: function(){
      return auth.$requireAuth();
    },

    register: function(user){
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser){
        var regRef = new Firebase(FIREBASE_URL + 'users')
          .child(regUser.uid).set({
            date: Firebase.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            name: user.name,
            email: user.email
          });

        myObj.login(user);

        $rootScope.message = '欢迎 ' + user.email + ' 来到我的应用';
      }).catch(function(error){
        $rootScope.message = error.message;
      });
    }
  };

  return myObj;
}]);