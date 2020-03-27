$(document).ready(function() {
  // Navigation

  // Information
  var subProfiles = "<ul>";
  subProfiles += "<li>" + window.testPerson.publicInfo.firstName + " " + window.testPerson.publicInfo.lastName + "</li>";
  // loop to add dogs
  subProfiles += "</ul>";
  $("#information #subProfiles").html(subProfiles);

  // Action

  // content
  $("#content #displayInfo #profilePicture").html("<img src=\"" + window.testPerson.publicInfo.profilePicture + "\">");
  $("#content #displayInfo #name").html(window.testPerson.publicInfo.firstName + " " + window.testPerson.publicInfo.lastName);
  $("#content #displayInfo #organisation").html(window.testPerson.publicInfo.organisation);
});