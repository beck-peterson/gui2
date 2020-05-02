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


        var ownerFName = search_field_form["firstname_input"].value;
        var ownerLName = search_field_form["lastname_input"].value;
        var ownerOrg = search_field_form["company_input"].value;
        var dogName = search_field_form["dog_name_input"].value;

        console.log(ownerFName);
        console.log(ownerLName);
        console.log(ownerOrg);

        var personRef = db.collection("Person");
          personRef.where("info.Display.value.map.First_Name.value", "==", ownerFName)
          personRef.where("info.Display.value.map.Last_Name.value", "==", ownerLName)
          personRef.where("info.Organization.value.map.Organization.title", "==", ownerOrg)
          personRef.where("info.Dogs.value.map.First_Name.title", "==", dogName)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            //collection.push(doc.data());
            $("#search_results").append(doc.data());
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
