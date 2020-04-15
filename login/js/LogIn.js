$(document).ready(function() {
// login the user
const loginForm = document.querySelector("#login");
loginForm.addEventListener("click", (e) => {
  e.preventDefault();
  // get user Info
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;

  auth.signInWithEmailAndPassword(email, password).then( cred => {
    console.log(cred.user);
  }).catch(function(error) {
    // Handle Errors here. Password must be > 6 characters
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    });
})

// listen for auth state changes - user logs in/out
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    console.log(user.uid)
  } else {
    console.log('user logged out');
  }
});

function signInWithGoogle(){
  var provider = new auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    alert("log in successful");
  }).catch(function(error) {
    // Handle Errors here.
    alert("log in unsuccessful");
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function signInWithFacebook(){
  var provider = new auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user);
  alert("log in successful");
}).catch(function(error) {
  // Handle Errors here.
  console.log(error);
  alert("log in unsuccesful");
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
});
