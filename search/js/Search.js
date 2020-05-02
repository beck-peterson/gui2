/* File: Search.js
 * Date Created: 4-12-2020
 * Description: Scripted configurations and functionality for
 * the CanineConnection Search Page.
*/
const stateAbbrvs = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
    'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

var collection = [];

$(document).ready(function () {
    // global for easy access to db
    window.db = firebase.firestore();
    // collect analyics metrics
    firebase.analytics();


    /* Dog fields */

    // Configure Breeds input field from supported breeds, queried from db
    db.collection('Breed').get().then(function (snapshot) {
        // Breeds field text input
        var jQueryBreedsInput = $("#breeds_input");
        // Bootstrap dropdown add-on for breeds input
        var jQueryBreedsDropdown = $("#breeds_dropdown_ul");

        // List each supported breed to the dropdown add-on
        snapshot.docs.forEach(function (breed) {
            var jQueryBreedItem = $(
                "<li><a href=\"#\">" + breed.data().name + "</a></li>"
            );
            $(jQueryBreedsDropdown).append(jQueryBreedItem);
        });

        // Append clicked dropdown breed's text to breed input
        $(jQueryBreedsDropdown).find("li").click(function () {
            var breed_input_val = $(jQueryBreedsInput).val();
            $(jQueryBreedsInput).val(breed_input_val + $(this).text() + ", ");
        });
    });

    // Populate age range selects with supported age values
    var i;
    $("#age_min_select, #age_max_select").each(function (index, age_select) {
        for (i = 1; i <= 16; i++) {
            $(age_select).append("<option>" + i + "</option>");
        }
    });


    /* Owner fields */



    // Populate owner state select with U.S. states
    jQueryStateSelect = $("#state_select");
    for (i = 0; i < stateAbbrvs.length; i++) {
        $(jQueryStateSelect).append("<option>" + stateAbbrvs[i] + "</option>");
    }

    search_field_form.addEventListener('submit' , (e) => {
      // want to prevent default because otherwise it reloads the page
        e.preventDefault()
        /* Validate search fields*/
        //To-do
        //info.Display.value.First_Name.value
        /* Query Firebase using search field input*/

        var OwnerFName = search_field_form["firstname_input"].value;
        var OwnerLName = search_field_form["lastname_input"].value;
        var OwnerOrg = search_field_form["company_input"].value;


        console.log(OwnerFName);

        db.collection("Person").where("info.Display.value.map.First_Name.value", "==", OwnerFName)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           console.log(doc.id, " => ", doc.data());
            $('#searchResults').append('<div id="' + doc.id + '" style="height:169px; margin-left:15px"></div>');
            $('#searchResults #' + doc.id).each(function () {
                var account = doc.data();
                var photo = account.info['Display'].value.map['Photo_URL'].value != '' ? account.info['Display'].value.map['Photo_URL'].value : 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png';
                $(this).append('<div style="float:left; margin-bottom:15px; margin-right:15px;"><img src="' + photo + '" class="img-thumbnail img-md-cropped"></div>');
                if (account.owner == null) {
                    var firstName = account.info['Display'].value.map['First_Name'].value;
                    var lastName = account.info['Display'].value.map['Last_Name'].value;
                    var age = account.info['Display'].value.map['Age'].value;
                    var city = account.info['Address'].value.map['City'].value;
                    var state = account.info['Address'].value.map['State'].value;
                    var organization = account.info['Organization'].value.map['Organization'].value;
                    $(this).append('<div id="firstLine"><h4 style="font-weight:bold">' + firstName + ' ' + lastName + '</h4></div>');
                    $(this).append('<div id="secondLine"><h4 style="font-weight:bold">' + age + '</h4></div>');
                    $(this).append('<div id="thirdLine"><h4 style="font-weight:bold">' + city + (city == '' || state == '' ? '' : ', ') + state + '</h4></div>');
                    $(this).append('<div id="fourthLine"><h4 style="font-weight:bold">' + organization + '</h4></div>');
                } else {
                    var firstName = account.info['Display'].value.map['First_Name'].value;
                    var lastName = account.info['Display'].value.map['Last_Name'].value;
                    var breeds = account.info['General'].value.map['Breeds'].value;
                    var age = account.info['Display'].value.map['Age'].value;
                    $(this).append('<div id="firstLine"><h4 style="font-weight:bold">' + firstName + ' ' + lastName + '</h4></div>');
                    $(this).append('<div id="secondLine"><h4 style="font-weight:bold">' + breeds + (breeds == '' || age == '' ? '' : ', ') + age + '</h4></div>');
                    $(this).append('<div id="thirdLine"><h4 style="font-weight:bold"></h4></div>'); // nothing on third line yet
                    $(this).append('<div id="fourthLine"><h4 style="font-weight:bold"></h4></div>'); // nothing on fourth line yet
                }
            });
            });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });



        /* Report queries to page*/
    });
});

function flag_field_err(jQueryFormGroup, errorMsg) {
    $(jQueryFormGroup).after("<span class=\"search_field_err\">"
        + errorMsg + "</span>");
};
