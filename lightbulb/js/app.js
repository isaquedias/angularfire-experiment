var myApp = angular.module("myApp", ["firebase"]);

      myApp.controller('MyController', ['$scope', '$firebase',
        function($scope, $firebase) {
          //CREATE A FIREBASE REFERENCE
          var ref = new Firebase("https://webdascoisas.firebaseio.com/");
		  var sync = $firebase(ref.child("house").child("lamp"));

			// create a synchronized object, all server changes are downloaded in realtime
			$scope.profileObject = sync.$asObject();
			// profileObject.name === "Marie Curie"
			// profileObject.dob === "November 7, 1867"
			
          // GET MESSAGES AS AN ARRAY
          $scope.action = $firebase(ref).$asArray();

          //ADD MESSAGE METHOD
          $scope.addMessage = function(e) {

            //LISTEN FOR RETURN KEY
            if (e.keyCode === 13 && $scope.msg) {
              //ALLOW CUSTOM OR ANONYMOUS USER NAMES
              var name = $scope.name || 'anonymous (ui)';

              //ADD TO FIREBASE
              $scope.messages.$add({
                from: name,
                body: $scope.msg
              });

              //RESET MESSAGE
              $scope.msg = "";
            }
          }
        }
      ]);
