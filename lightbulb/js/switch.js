// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module("starter", ["ionic","firebase"]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller('MyController', function($scope, $firebase,$timeout,$ionicLoading ) {
          
  // Function to show Ionic's default loading icon.
  var showLoading = function(time) {
    
       this.loadingIndicator = $ionicLoading.show({
        content: '<i class="icon ion-loading-d"></i>',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 5  // If the delay is too fast and you also change states, while the loader is showing, you can get flashing behavior
      }); 

        // Hide the loadingIndicator 1500 ms later
    $timeout(function(){
      $ionicLoading.hide();
    }, time); 
   
   
  }

    showLoading(1000);
          //CREATE A FIREBASE REFERENCE
          var ref = new Firebase("https://webdascoisas.firebaseio.com/");
        var sync = $firebase(ref.child("house").child("lamp"));

      // create a synchronized object, all server changes are downloaded in realtime
      var profileObject = sync.$asObject();
    
      
          // TOGGLE FUNCTION THAT CHANGES THE STATE OF THE LAMP
          $scope.changeStatus = function(){
          $scope.lamp.state = !$scope.lamp.state;
          profileObject.state = $scope.lamp.state;
           profileObject.$save();
         }

          $scope.lamp = profileObject;
         
          
          }
        })
