   // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDEGszpYr2fWBHG9sN-O-XbUGkJ9tsDubI",
    authDomain: "picturethis-92110.firebaseapp.com",
    databaseURL: "https://picturethis-92110.firebaseio.com/",
    storageBucket: "picturethis-92110.appspot.com",
    messagingSenderId: "335525136354"
  };
 firebase.initializeApp(config);

 		var database = firebase.database().ref();

			function writeUserData(userId, name, email, imageUrl,timestamp, providerData) {
			//	alert();
			 firebase.database().ref('users/' + userId).set({
				username: name,
				email: email,
				profile_picture : imageUrl,
				timestamp: firebase.database.ServerValue.TIMESTAMP,
				providerData: providerData
			  });
			}
		
			
 
       // FirebaseUI config.
      var uiConfig = {
        'signInSuccessUrl': '../../index.html',
        'signInOptions': [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': '<your-tos-url>',
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
	  

      initApp = function() {
		  
		  
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var userId = user.uid;
			var timestamp = user.timestamp;
            var providerData = user.providerData;
	        var photoURL = providerData[0].photoURL || user.photoURL;
			
			writeUserData(userId, displayName, email, photoURL,timestamp, providerData);
		//	writeUserData('1234', 'Jake SomeBody', 'jake@no-email.com', 'https://c4.staticflickr.com/4/3771/buddyicons/20151677@N00.jpg?','');
			//alert('Welcome ' + displayName);

          } else {
            // User is signed out.
//alert('User is signed out');
         //   document.getElementById('account-details').textContent = 'null';
          }
        }, function(error) {
          console.log(error);
        });
      };

     window.addEventListener('load', function() {
        initApp();
		
		
		
		
		
		
		
		
      });

  