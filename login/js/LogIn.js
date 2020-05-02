$(document).ready(function() {
// login the user
const loginForm = document.querySelector("#login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //before Authentication, check if the fields are valid first before making auth
  if ($("#signInEmail").valid() && $("#signInPassword").valid()){
    // get user Info
    const email = loginForm['signInEmail'].value;
    const password = loginForm['signInPassword'].value;

    //div content for printing out messages to user regarding login success or fail
    var element = document.getElementById("loginInfo");

    auth.signInWithEmailAndPassword(email, password).then( cred => {
      console.log(cred.user);
      element.innerHTML = "";
      window.location.href = "https://beck-peterson.github.io/gui2/profile/index.html";
    }).catch(function(error) {
      // Handle Errors here. Password must be > 6 characters
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      element.innerHTML = "[Email Address or Password is incorrect]";
      });
  }else{
    // fields are invalid
    console.log("Login credential invalid.")
  }
})

// listen for auth state changes - user logs in/out
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    console.log(user.uid)
    window.location.href = "https://beck-peterson.github.io/gui2/profile/index.html";
  } else {
    console.log('user logged out');
  }
});

$("#login").validate({
  rules:{
    signInEmail: {
      required: true,
      email: true
    },
    signInPassword: {
      required: true
    }
  },
  messages:{
    signInEmail:{
      required: "Please enter an Email",
      email: "Invalid Email Address"
    },
    signInPassword:{
      required: "Please enter a Password"
    }
  },
  onkeyup: function(element) {
    var list = $("input");
    if(element == list[0]){
      $("#signInEmail").valid();
      $("#signInPassword").valid();
    }
    if(element == list[1]){
      $("#signInPassword").valid();
      $("#signInEmail").valid();
    }
  }
});
});

function signInWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    window.location.href = "https://beck-peterson.github.io/gui2/profile/index.html";
  }).catch(function(error) {
    // Handle Errors here.
    alert("log in unsuccessful");
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function signInWithFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    window.location.href = "https://beck-peterson.github.io/gui2/profile/index.html";
  }).catch(function(error) {
    // Handle Errors here.
    alert("log in unsuccesful");
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    });
}
