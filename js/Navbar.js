/* File: Navbar.js
 * Created: 4-19-2020
 * Description: Script to configure CanineConnection's top-fixed site navbar on page load.
 * Requirements:
 *  - JQuery 3.14
 *  - Bootstrap 3.4.1
 *  - Firebase 7.14.0
*/

// Site URL
var siteURL = "https://beck-peterson.github.io/gui2"
// Links of nav pills displayed to logged out users
var loginLink = siteURL + "/login/LogIn.html"
var signupLink = siteURL + "/signup/SignUp.html"

// Links of nav pills displayed to logged out users
var searchLink = siteURL + "/search/search.html"
var profileLink = siteURL + "/profile/index.html"
var messagingLink = siteURL + "/messaging/messaging.html"

$(document).ready(function () {
    // Site navbar ul to contain navigation links
    var jQueryNavPills = $("#navbar_pills");

    /**
     * Generates a .navbar_pill li that displays a glyphicon
     * of the argument Bootstrap glyphicon CSS class.
     * 
     * The generated pill should be inserted to the link ul of
     * the site navbar.
     * 
     * @param {string} link Pill link destination
     * @param {string} glyphClass CSS class of pill glyphicon
     * @param {string} text Text to prepend glyphicon
     * @return {Object} JQuery instance of generated .navbar_pill
     */
    function genNavPill(glyphClass, link = "#", text = "") {
        return $(
            "<li class=\"navbar_pill\"><a href=\"" + link + "\">"
            + "<span>" + text + "</span>"
            + "<span class=\"glyphicon " + glyphClass + "\">"
            + "</span></a></li>"
        );
    }

    // Populate nav bar with nav links contextual to user's log-in status
    $(jQueryNavPills).empty();
    firebase.auth().onAuthStateChanged(function (user) {
        // When user is logged in, list authentication-required links
        if (user) {
            $(jQueryNavPills).append(genNavPill("glyphicon-search", "#"));
            $(jQueryNavPills).append(genNavPill("glyphicon-envelope", "#"));
            $(jQueryNavPills).append(genNavPill("glyphicon-user", "#"));
            $(jQueryNavPills).append(genNavPill("glyphicon-cog", "#"));
            $(jQueryNavPills).append(genNavPill("glyphicon-log-out", "#"));
        }
        // When user is unauthenticated, list Log-In and Sign-Up links
        else {
            $(jQueryNavPills).append(genNavPill("glyphicon-log-in", "#", "Log-In"));
            $(jQueryNavPills).append(genNavPill("glyphicon-copy", "#", "Sign-Up"));
        }
    });
});
