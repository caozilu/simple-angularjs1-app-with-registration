/**
 * @fileOverview
 * @author caozilu
 */
var myApp = angular.module('myApp', ['ngRoute', 'firebase']).constant('FIREBASE_URL', 'https://simple-angularjs-app.firebaseIO.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, previous, next, error){
    if (error=='AUTH_REQUIRED'){
      $rootScope.message = '登录用户才能访问此页';
      $location.path('/login');
    }
  });
}]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'RegistrationController'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'RegistrationController'
  }).when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegistrationController'
  }).when('/success', {
    templateUrl: 'views/success.html',
    controller: 'SuccessController',
    resolve: {
      currentAuth: function(Authentication){
        return Authentication.requireAuth();
      }
    }
  }).otherwise({
    redirectTo: '/login'
  });
}]);