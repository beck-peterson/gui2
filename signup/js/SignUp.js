$(document).ready(function() {

  const signupForm = document.querySelector('#signup');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user Info
    var name = signupForm['name'].value;
    name = name.split(' ');
    var fName = name[0];
    var lName = name[1];
    var email = signupForm['email'].value;
    var password = signupForm['password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then( cred => {
      console.log(cred.user.uid);
      db.collection('Person').doc(cred.user.uid).set({
          display: {
              photo: null,
              firstName: fName,
              middleName: "",
              lastName: lName,
              age: "",
              summary: ""
              },
          photos: [],
          info: {
              "Posts": {
                  title: "Posts",
                  visibility: "private",
                  map: {},
                  array: []
              },
              "Dogs": {
                  title: "Dogs",
                  visibility: "private",
                  map: {}
              },
              "Contact": {
                  title: "Contact",
                  visibility: "protected",
                  map: {
                      "Email": email,
                      "Phone": ""
                  }
              },
              "Address": {
                  title: "Address",
                  visibility: "protected",
                  map: {
                      "Address": "",
                      "City": "",
                      "State": "",
                      "Zip": ""
                  }
              },
              "Organization": {
                  title: "Organization",
                  visibility: "public",
                  map: {
                      "Organization": ""
                  }
              }
          },
          parent: null,
          userID: cred.user.uid
      });
    }).catch(function(error) {
      // Handle Errors here. Password must be > 6 characters
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      });
    });

  const logout = document.querySelector("#logout");
  logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("user signed out");
    })
  })

  // listen for auth state changes - user logs in/out
  auth.onAuthStateChanged(user => {
    //console.log(user);
  })





function signUpWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    alert("sign up successful");
  }).catch(function(error) {
    // Handle Errors here.
    alert("sign up unsuccessful")
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function signUpWithFacebook(){
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user);
  alert("sign up successful");
}).catch(function(error) {
  // Handle Errors here.
  alert("sign up unsuccessful")
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
