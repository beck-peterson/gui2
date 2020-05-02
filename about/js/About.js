
$(document).ready(function () {
  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in: ', user);
      console.log(user.displayName);
    }else {
      console.log('user logged out');
      window.location.href = "https://beck-peterson.github.io/gui2/landing/LandingOut.html";
    }
  });
});


function logout() {
  const auth = firebase.auth();
  auth.signOut().then(() => {
      console.log('user pressed the log out button');
  });
}
