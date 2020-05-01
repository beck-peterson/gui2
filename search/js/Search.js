
const stateAbbrvs = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
    'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

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
            $(jQueryBreedsInput).val(breed_input_val + "[" + $(this).text() + "] ");
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

    $("#search_submit_btn").on("click", function () {
        /* Validate search fields*/
        //To-do

        /* Query Firebase using search field input*/

        /* Report queries to page*/
    });
});

function flag_field_err(jQueryFormGroup, errorMsg) {
    $(jQueryFormGroup).after("<span class=\"search_field_err\">"
        + errorMsg + "</span>");
};
