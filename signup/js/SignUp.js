$(document).ready(function() {
  const signupForm = document.querySelector('#signup');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user Info
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;


    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then( cred => {
      //console.log(cred)
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



  });
