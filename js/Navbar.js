/* File: Navbar.js
 * Created: 4-19-2020
 * Description: Script for configuring CanineConnection's navbar appearance
 * given the user's log-in status. Requires Firebase to have been initialized.
 * Requirements:
 *  - JQuery 3.14
 *  - Bootstrap 3.4.1
 *  - Firebase 7.14.0
 */ 
$(document).ready(function () {
    // Top-fixed site navigation bar with right-aligned link pills
    var jQuerySiteNavbar = $(".navbar");

    // If no user is signed in,
    // replace link pills with Log-in and Register pills
    if (firebase.auth().currentUser == null) {
        // Remove navbar pills
        jQueryNavPills = $("#navbar_pills");
        $(jQueryNavPills).empty();

        // Append Log-in pill to navbar pills list
        $(jQueryNavPills).append(
            "<li class=\"navbar_pill\">"
            + "<a href=\"https://beck-peterson.github.io/gui2/login/LogIn.html\">"
            + "<span>Log-in </span><span class=\"glyphicon glyphicon-log-in\">"
            + "</span></a></li>");
        // Append Sign-up pill to navbar pills list
        $(jQueryNavPills).append(
            "<li class=\"navbar_pill\">"
            + "<a href=\"https://beck-peterson.github.io/gui2/signup/SignUp.html\">"
            + "<span>Sign-up </span><span class=\"glyphicon glyphicon-copy\">"
            + "</span></a></li>");
    };
});
