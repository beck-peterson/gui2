$(document).ready(function() {

  const signupForm = document.querySelector('#signup');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //before Authentication, check if the fields are valid first before making auth
    if($("#signUpName").valid() && $("#signUpEmail").valid() && $("#signUpPassword").valid() && $("#signUpPhone").valid()){
    // get user Info
      var name = signupForm['signUpName'].value;
      name = name.split(' ');
      var fName = name[0];
      var lName = name[1];
      var email = signupForm['signUpEmail'].value;
      var password = signupForm['signUpPassword'].value;

      // sign up the user
      auth.createUserWithEmailAndPassword(email, password).then( cred => {
        console.log(cred.user.uid);
        db.collection('Person').doc(cred.user.uid).set({
            PersonDisplay: {
                firstName: fName,
                lastName: lName,
                location: "",
                middleName: "",
                organization: "",
                photo: "",
                prefix: "",
                suffix: "",
                summary: ""
                },
            info: "",
            photos: "",
            userID: cred.user.uid
        });
      }).catch(function(error) {
        // Handle Errors here. Password must be > 6 characters
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Either the same credential existed or something broke")
        });
    }else{
      console.log("Sign up fields are not filled out")
    }
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

$("#signup").validate({
  rules:{
    signUpName:{
      required: true
    },
    signUpEmail: {
      required: true,
      email: true
    },
    signUpPassword: {
      required: true,
      property: true
    },
    signUpPhone:{
      required: true,
      phoneUS: true
    }
  },
  messages:{
    signUpName:{
      required: "Please enter a Name"
    },
    signUpEmail:{
      required: "Please enter an Email",
      email: "Invalid Email Address"
    },
    signUpPassword:{
      required: "Please enter a Password",
    },
    signUpPhone:{
      required: "Please enter a mobile number",
      phoneUS: "Please specify a valid US mobile number"
    }
  },
  onkeyup: function(element) {
    var list = $("input");
    if(element == list[0]){
      $("#signUpName").valid();
    }
    if(element == list[1]){
      $("#signUpEmail").valid();
    }
    if(element == list[2]){
      $("#signUpPassword").valid();
    }
    if(element == list[3]){
      $("#signUpPhone").valid();
    }
  }
});
});

$.validator.addMethod("property", function(value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/.test(value);
}, "•Must be 6 to 15 characters<br> •At least one number<br> •At least one uppercase letter<br> •At least one lowercase letter"); /* message to be outputed if failed the above regex*/
