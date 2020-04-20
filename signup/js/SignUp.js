$(document).ready(function() {

  const signupForm = document.querySelector('#signup');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //before Authentication, check if the fields are valid first before making auth
    if($("#signUpFname").valid() && $("#signUpLname").valid() && $("#signUpEmail").valid() && $("#signUpPassword").valid() && $("#signUpAge").valid() && $("#signUpPhone").valid()){
    // get user Info
      var email = signupForm['signUpEmail'].value;
      var password = signupForm['signUpPassword'].value;
      var fname = signupForm['signUpFname'].value;
      var mname = signupForm['signUpMname'].value;
      var lname = signupForm['signUpLname'].value;
      var age = signupForm['signUpAge'].value;
      var phone = signupForm['signUpPhone'].value;
      var org = signupForm['signUpOrg'].value;
      var address = signupForm['signUpAddress'].value;
      var city = signupForm['signUpCity'].value;
      var state = signupForm['signUpState'].value;
      var zip = signupForm['signUpZip'].value;
      // console.log(auth.user.displayName);
      // console.log(fname + " " + lname);
      // auth.user.displayName = fname + " " + lname;
      // sign up the user
      auth.createUserWithEmailAndPassword(email, password).then( cred => {
        console.log(cred.user.uid);
        var i = 0;
        db.collection('Person').doc(cred.user.uid).set({
            photos: [],
            info: {
                "Display": {
                    value: {
                        title: "Display",
                        visibility: "protected",
                        map: {
                            "Photo_URL": {
                                value: "",
                                order: i++
                            },
                            "First_Name": {
                                value: fname,
                                order: i++
                            },
                            "Middle_Name": {
                                value: mname,
                                order: i++
                            },
                            "Last_Name": {
                                value: lname,
                                order: i++
                            },
                            "Age": {
                                value: age,
                                order: i++
                            },
                            "Summary": {
                                value: "",
                                order: i++
                            }
                        }
                    },
                    order: i++
                },
                "Posts": {
                    value: {
                        title: "Posts",
                        visibility: "private",
                        map: {},
                        array: []
                    },
                    order: i++
                },
                "Dogs": {
                    value: {
                        title: "Dogs",
                        visibility: "private",
                        map: {}
                    },
                    order: i++
                },
                "Contact": {
                    value: {
                        title: "Contact",
                        visibility: "protected",
                        map: {
                            "Phone": {
                                value: phone,
                                order: i++
                            },
                            "Email": {
                                value: email,
                                order: i++
                            },
                        }
                    },
                    order: i++
                },
                "Address": {
                    value: {
                        title: "Address",
                        visibility: "protected",
                        map: {
                            "Address": {
                                value: address,
                                order: i++
                            },
                            "City": {
                                value: city,
                                order: i++
                            },
                            "State": {
                                value: state,
                                order: i++
                            },
                            "Zip": {
                                value: zip,
                                order: i++
                            }
                        }
                    },
                    order: i++
                },
                "Organization": {
                    value: {
                        title: "Organization",
                        visibility: "public",
                        map: {
                            "Organization": {
                                value: org,
                                order: i++
                            }
                        }
                    },
                    order: i++
                }
            },
            owner: null,
            uid: cred.user.uid
        });
      }).catch(function(error) {
        // Handle Errors here. Password must be > 6 characters
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        console.log("Either the same credential existed or something broke or You are running on local")
        });
    }else{
      console.log("Sign up fields are not filled out")
    }
})

  // listen for auth state changes - user logs in/out
  auth.onAuthStateChanged(user => {
     // window.location.href = (window.location + "").replace(/signup\/SignUp.html.*$/, "profile/index.html");
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
    console.log(errorCode)
    console.log(errorMessage)
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
    console.log(errorCode)
    console.log(errorMessage)
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

$("#signup").validate({
  rules:{
    signUpEmail: {
      required: true,
      email: true
    },
    signUpPassword: {
      required: true,
      property: true
    },
    signUpFname:{
      required: true
    },
    signUpLname:{
      required: true
    },
    signUpAge:{
      required: true
    },
    signUpPhone:{
      required: true,
      phoneUS: true
    },
    signUpZip:{
      zipcodeUS: true
    }
  },
  messages:{
    signUpEmail:{
      required: "Please enter an Email",
      email: "Invalid Email Address"
    },
    signUpPassword:{
      required: "Please enter a Password",
    },
    signUpFname:{
      required: "Please enter First Name"
    },
    signUpLname:{
      required: "Please enter Last Name"
    },
    signUpAge:{
      required: "Required"
    },
    signUpPhone:{
      required: "Required",
      phoneUS: "Please specify a valid US mobile number"
    }
  },
  onkeyup: function(element) {
    var list = $("input");/*
0: input#signUpEmail.form-control
1: input#signUpPassword.form-control
2: input#signUpFname.form-control
3: input#signUpMname.form-control
4: input#signUpLname.form-control
5: input#signUpAge.form-control
6: input#signUpPhone.form-control
7: input#signUpOrg.form-control
8: input#signUpAddress.form-control
9: input#signUpCity.form-control
10: input#signUpZip.form-control*/
    if(element == list[0]){
      $("#signUpEmail").valid();
    }
    if(element == list[1]){
      $("#signUpPassword").valid();
    }
    if(element == list[2]){
      $("#signUpFname").valid();
    }
    if(element == list[4]){
      $("#signUpLname").valid();
    }
    if(element == list[5]){
      $("#signUpAge").valid();
    }
    if(element == list[6]){
      $("#signUpPhone").valid();
    }
    if(element == list[10]){
      $("#signUpZip").valid();
    }
  }
});
});

$.validator.addMethod("property", function(value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/.test(value);
}, "•Must be 6 to 15 characters<br> •At least one number<br> •At least one uppercase letter<br> •At least one lowercase letter"); /* message to be outputed if failed the above regex*/
