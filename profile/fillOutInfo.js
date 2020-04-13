$(document).ready(function() {
    loadAccount(window.testPerson, "profile");

    $("#action button").click(function() {
        $("#action button").each(function() {
            $(this).removeClass("btn-outline-primary");
            $(this).addClass("btn-primary");
        });
        $(this).removeClass("btn-primary");
        $(this).addClass("btn-outline-primary");
        loadAccount(window.currentAccount, $(this).attr("id"));
    });
});

// This function can accept person or dog accounts
function loadAccount(account, selectedTab = "profile") {
    var person = account.parent == null ? account : account.parent;
    window.currentPerson = person;
    window.currentAccount = account;
    window.currentTab = selectedTab;
    
    // Navigation

    // Information
    $("#information #subProfiles").each(function() {
        $(this).empty();
        $(this).append("<ul class=\"nav nav-tabs nav-stacked\"></ul>");
        $("#information #subProfiles ul").each(function() {
            $(this).append("<li id=\"" + person.display.firstName + "\" class=\"col-sm-12\"><a href=\"#\" onclick=\"changeProfile('" + person.display.firstName + "')\">" + person.display.firstName + " " + person.display.lastName + "</a></li>");
            for (let dog of person.info.get("Dogs").map.values()) {
                $(this).append("<li id=\"" + dog.display.firstName + "\" class=\"col-sm-10\" onclick=\"changeProfile('" + dog.display.firstName + "')\"><a href=\"#\">" + dog.display.firstName + "</a></li>");
            }
        });

    });
    $("#information #subProfiles ul #" + account.display.firstName).addClass("active");

    // Action
    if (window.loggedInPerson == window.currentPerson) {
        $("#action #settings").css("visibility", "visible");
    } else {
        $("#action #settings").css("visibility", "hidden");
    }

    $("#content").each(function() {
        $(this).empty();
        switch (selectedTab) {
            case "profile":
                $(this).append("<div id=\"displayInfo\"></div>");
                $("#content #displayInfo").each(function() {
                    var photo = account.display.photo != null ? account.display.photo : "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png";
                    $(this).append("<div id=\"photo\" style=\"float:left\"><img src=\"" + photo + "\" class=\"img-thumbnail img-md-cropped\"></div>");
                    $(this).append("<div id=\"firstLine\">" + account.display.firstLine + "</div>");
                    $(this).append("<div id=\"secondLine\">" + account.display.secondLine + "</div>");
                    $(this).append("<div id=\"thirdLine\">" + account.display.thirdLine + "</div>");
                    $(this).append("<div id=\"fourthLine\">" + account.display.fourthLine + "</div>");
                    $(this).append("<div id=\"summary\" style=\"float:right\">" + account.display.summary + "</div>");
                });
                $(this).append("<div id=\"comment\" class=\"form-group\"></div>");
                $("#content #comment").each(function() {
                    $(this).append("<textarea class=\"form-control\" rows=\"3\" style=\"resize:none\" placeholder=\"Share something!\"></textarea>");
                });
                $(this).append("<div id=\"wall\"></div>");
                if (account.info.get("Posts") != null) {
                    for (let post of account.info.get("Posts").array) {
                        $("#content #wall").append("<div class=\"panel panel-primary\"><div class=\"post panel-body\">" + post.text + "</div></div>")
                    }
                }
                break;
            case "photos":
                for (let photo of account.photos) {
                    $(this).append("<img src=\"" + photo + "\" class=\"img-thumbnail img-lg-cropped\">");
                }
                break;
            case "moreInfo":
                for (let info of account.info.values()) {
                    if (info.visibility == "public") {
                        $(this).append("<div id=\"" + info.title + "\" class=\"panel panel-primary\"></div>");
                        $("#content #" + info.title).append("<div class=\"panel-heading\">" + info.title + "</div>");
                        var contents = "";
                        for (let [key, value] of info.map) {
                            contents += key + ": " + value + "<br>";
                        }
                        contents = contents.replace(/<br>$/, "");
                        $("#content #" + info.title).append("<div class=\"panel-body\">" + contents + "</div>");
                    }
                }
                break;
            case "settings":
                for (let info of account.info.values()) {
                    if (info.visibility == "public" || info.visibility == "protected") {
                        $(this).append("<div id=\"" + info.title + "\" class=\"panel panel-primary\"></div>");
                        $("#content #" + info.title).each(function() {
                            $(this).append("<div class=\"panel-heading\">" + info.title + "</div>");
                            $(this).append("<div id=\"" + info.title + "\" class=\"panel-body\"></div>");
                            $("#content #" + info.title + " .panel-body").each(function() {
                                for (let [key, value] of info.map) {
                                    $(this).append("<div id=\"" + key + "\" class=\"form-group\"></div>");
                                    $("#content #" + info.title + " .panel-body #" + key).each(function() {
                                        $(this).append("<label class=\"control-label col-sm-2\">" + key + ":</label>");
                                        $(this).append("<div class=\"col-sm-10\"><input type=\"text\" class=\"form-control\" value=\"" + value + "\"></div>");
                                    });
                                }
                            });
                        });
                    }
                }
                $(this).append("<div class=\"col-sm-2\"><button id=\"save\" class=\"btn btn-block btn-primary\">Save</button></div>")
                break;
        }
    });
}

function changeProfile(name) {
    var account = window.currentPerson.display.firstName == name ? window.currentPerson : window.currentPerson.info.get("Dogs").map.get(name);
    loadAccount(account, window.currentTab);
}