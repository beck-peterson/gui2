$(document).ready(function() {
  loadUser(window.testPerson, window.testPerson);
});

function loadUser(user, owner = user) {
  // Navigation

  // Information
  var subProfiles = "<ul class=\"nav nav-tabs nav-stacked\">";
  subProfiles += "<li class=\"active col-sm-12\"><a href=\"#\" onclick=\"setOwner()\">" + owner.publicInfo.firstName + " " + owner.publicInfo.lastName + "</a></li>";
  for (i in owner.dogs) {
    var dog = owner.dogs[i];
    subProfiles += "<li class=\"col-sm-10\" onclick=\"setDog()\"><a href=\"#\">" + dog.publicInfo.firstName + "</a></li>";
  }
  subProfiles += "</ul>";
  $("#information #subProfiles").html(subProfiles);

  // Action

  // content
  $("#content #displayInfo #profilePicture").html("<img src=\"" + user.publicInfo.profilePicture + "\" class=\"img-thumbnail img-md-cropped\">");
  $("#content #displayInfo #name").html(user.publicInfo.firstName + " " + user.publicInfo.lastName);
  $("#content #displayInfo #organization").html(user.publicInfo.organization);
  $("#content #displayInfo #bio").html(user.publicInfo.bio);
}

function setOwner() {
  loadUser(window.testPerson);
  $("#subProfiles ul li:eq(0)").addClass("active");
  $("#subProfiles ul li:eq(1)").removeClass("active");
}

function setDog() {
  loadUser(window.testPerson.dogs[0], window.testPerson);
  $("#subProfiles ul li:eq(0)").removeClass("active");
  $("#subProfiles ul li:eq(1)").addClass("active");
}