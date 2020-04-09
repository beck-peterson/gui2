$(document).ready(function() {
    loadAccount(window.testPerson);
});

// This function can accept person or dog accounts
function loadAccount(account) {
    var person = account.parent == null ? account : account.parent;
    window.currentPerson = person;

    // Navigation

    // Information
    var subProfiles = "<ul class=\"nav nav-tabs nav-stacked\">";
    subProfiles += "<li id=\"" + person.display.firstName + "\" class=\"col-sm-12\"><a href=\"#\" onclick=\"changeProfile('" + person.display.firstName + "')\">" + person.display.firstName + " " + person.display.lastName + "</a></li>";
    for (let dog of person.info.get("Dogs").map.values()) {
        subProfiles += "<li id=\"" + dog.display.firstName + "\" class=\"col-sm-10\" onclick=\"changeProfile('" + dog.display.firstName + "')\"><a href=\"#\">" + dog.display.firstName + "</a></li>";
    }
    subProfiles += "</ul>";
    $("#information #subProfiles").html(subProfiles);
    $("#information #subProfiles ul #" + account.display.firstName).addClass("active");

    // Action

    // Content
    var photo = account.display.photo != null ? account.display.photo : "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png";
    $("#content #displayInfo #photo").html("<img src=\"" + photo + "\" class=\"img-thumbnail img-md-cropped\">");
    $("#content #displayInfo #firstLine").html(account.display.firstLine);
    $("#content #displayInfo #secondLine").html(account.display.secondLine);
    $("#content #displayInfo #thirdLine").html(account.display.thirdLine);
    $("#content #displayInfo #fourthLine").html(account.display.fourthLine);
    $("#content #displayInfo #summary").html(account.display.summary);
}

function changeProfile(name) {
    var account = window.currentPerson.display.firstName == name ? window.currentPerson : window.currentPerson.info.get("Dogs").map.get(name);
    loadAccount(account);
}