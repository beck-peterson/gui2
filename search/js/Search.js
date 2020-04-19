
const stateAbbrvs = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
    'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
    'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
    'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

$(document).ready(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: 'AIzaSyCeN7ffDFm4ldcV_b77vHtmp69ecLdnNcY',
        authDomain: 'canine-connection-b2414.firebaseapp.com',
        databaseURL: 'https://canine-connection-b2414.firebaseio.com/',
        projectId: 'canine-connection-b2414',
        storageBucket: 'canine-connection-b2414.appspot.com',
        messagingSenderId: '841972379358',
        appId: '1:841972379358:web:1653668eee22a73bc95c4f',
        measurementId: 'G-QYRPTG50Z3'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // global for easy access to db
    window.db = firebase.firestore();

    const auth = firebase.auth();
    // db.settings({ timestampsInSnapshots: true });
    firebase.analytics();

    /* Populate age range selects with supported age options */
    var i;
    $("#age_min_select, #age_max_select").each(function (index, age_select) {
        for (i = 1; i <= 16; i++) {
            $(age_select).append("<option>" + i + "</option>");
        }
    });
    /* TO-DO: Populate heritage dropdown with dog breeds from db*/

    /* Populate owner state select with U.S. states*/
    jQueryStateSelect = $("#state_select");
    for (i = 0; i < stateAbbrvs.length; i++) {
        $(jQueryStateSelect).append("<option>" + stateAbbrvs[i] + "</option>");
    }
    db.collection('Dog').get().then((snapshot) => {
        // cycle through each document in the Dog collection and print to console
        snapshot.docs.forEach(doc => {
            console.log(doc.data())
        })
    })
    $("#search_submit_btn").on("click", function () {
        /* Validate search fields*/
        //To-do

        /* Query Firebase using search field input*/

        // asynchronus call, fires then() when .get() has retrieved a snapshot of the database

        /* Report queries to page*/
    });
});

function flag_field_err(jQueryFormGroup, errorMsg) {
    $(jQueryFormGroup).after("<span class=\"search_field_err\">"
        + errorMsg + "</span>");
};
