$(document).ready(function(){
	
	$("#head-title").typed({
		strings: ["Learn today ..^1000 Lead Tomorrow!^1000", "Interactive and easy to follow^1000" ,"Visually stimulating tutorials^1000","Learn at your own pace^1000"],
		typeSpeed: 100,
		loop: true,
		startDelay: 100
	});

      initApp = function() {
		  
		  
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var userId = user.uid;
            var providerData = user.providerData;
	        var photoURL = providerData[0].photoURL || user.photoURL;
			//var defaultPhoto = "./picturethis/images/user.png";
			
			
			document.getElementById('userId').src= photoURL;
          } else {
            // User is signed out.
			alert('User is signed out');
         //   document.getElementById('account-details').textContent = 'null';
			//document.getElementById('userId').src=defaultPhoto;
          }
        }, function(error) {
          console.log(error);
        });
      };
	  
	  initApp();

function createUser(user){
	var newImage = document.createElement('img');
	var photoURL = user.profile_picture;
	var displayName = user.username;
	  
var para = document.createElement("P");
    var name = document.createTextNode(displayName);
	para.appendChild(newImage);
    para.appendChild(name);
    	  
	newImage.src = user.profile_picture;
	newImage.setAttribute('class', 'img-circle');
	para.setAttribute('class', 'userName');

		return para;
}

/*
var ref = firebase.database().ref("users");
query = ref.orderByChild('timestamp');
query.on("value", function(snapshot) {
  snapshot.forEach(function(data) {
    console.log("The " + data.key() + " dinosaur's score is " + data.val());
  });

});
*/

var ref = firebase.database().ref("users/"),
    query = ref.orderByChild('timestamp'),
    members = [];

query.once('value', function(snap) {
//console.log(snap.val());
  snap.forEach(function(snapshot) {
    members.push(snapshot.val());
  });

  members = members.reverse();
//  alert('members');
	   var users = document.getElementById('users');
		for(i=0;i<3;i++){
		   var childData =  members[i];
		   var user = createUser(childData);
		   users.append(user);		
			
		} 
});



/*
var query = firebase.database().ref("users/");//.orderByChild('timeStamp');
query.once("value")
  .then(function(snapshot) {
	  var count = 0;
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
	  console.log("key "+key);
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();

	   var user = createUser(childData);
	   var users = document.getElementById('users');
	   users.append(user);
	   count++;
	   if(count>=3){return true};
  });
});	  
	  
*/	  
	  
});         





