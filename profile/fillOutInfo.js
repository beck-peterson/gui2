$(document).ready(function() {
  // Navigation

  // Information
  var subProfiles = "<ul class=\"nav nav-tabs nav-stacked\">";
  subProfiles += "<li class=\"active col-sm-12\"><a href=\"#\">" + window.testPerson.publicInfo.firstName + " " + window.testPerson.publicInfo.lastName + "</a></li>";
  for (i in window.testPerson.dogs) {
    var dog = window.testPerson.dogs[i];
    subProfiles += "<li class=\"col-sm-10\"><a href=\"#\">" + dog.generalInfo.firstName + "</a></li>";
  }
  subProfiles += "</ul>";
  $("#information #subProfiles").html(subProfiles);

  // Action

  // content
  $("#content #displayInfo #profilePicture").html("<img src=\"" + window.testPerson.publicInfo.profilePicture + "\" width=\"164\" height=\"164\"class=\"img-thumbnail img-md-cropped\">");
  $("#content #displayInfo #name").html(window.testPerson.publicInfo.firstName + " " + window.testPerson.publicInfo.lastName);
  $("#content #displayInfo #organisation").html(window.testPerson.publicInfo.organization);
});