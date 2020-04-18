$(document).ready(function() {
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
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log('user logged in: ', user);
            console.log(user.uid);
            var docRef = window.db.collection('Person').doc(user.uid);
            docRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log('Document data:', doc.data());
                    window.loggedInPerson = doc.data();
                    loadAccount(window.loggedInPerson, window.loggedInPerson, 'profile');
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            }).catch(function(error) {
                console.log('Error getting document:', error);
            });
        } else {
            console.log('user logged out');
        }
    });

    $('#action button').click(function() {
        $('#action button').each(function() {
            $(this).removeClass('btn-outline-primary');
            $(this).addClass('btn-primary');
        });
        $(this).removeClass('btn-primary');
        $(this).addClass('btn-outline-primary');
        loadAccount(window.currentPerson, window.currentAccount, $(this).attr('id'));
    });
});

// This function can accept person or dog accounts
function loadAccount(person = window.currentPerson, account = window.currentAccount, selectedTab = window.currentTab) {
    window.currentPerson = person;
    window.currentAccount = account;
    window.currentTab = selectedTab;
    
    // Navigation

    // Information
    $('#information').each(function() {
        $(this).empty();
        $(this).append('<div id="subProfiles"></div>');
    });
    $('#information #subProfiles').each(function() {
        $(this).append('<ul class="nav nav-tabs nav-stacked"></ul>');
        $('#information #subProfiles ul').each(function() {
            $(this).append('<li id="' + person.uid + '" class="col-sm-12"><a href="#" onclick="changeProfile(\'' + person.uid + '\')">' + person.info['Display'].map['First_Name'] + ' ' + person.info['Display'].map['Last_Name'] + '</a></li>');
            if (person.info['Dogs'] != null) {
                for (i in person.info['Dogs'].map) {
                    var dog = person.info['Dogs'].map[i];
                    $(this).append('<li id="' + dog.uid + '" class="col-sm-10"><a href="#" onclick="changeProfile(\'' + dog.uid + '\')">' + dog.info['Display'].map['First_Name'] + '</a></li>');
                }
            }
        });

    });
    $('#information #subProfiles ul #' + account.uid).addClass('active');
    $('#information').append('<button id="addDog" class="btn btn-block btn-primary">Add Dog</button>');
    $('#information #addDog').click(function() {
        var uid = generateUUID();
        person.info['Dogs'].map[uid] = {
            photos: [],
            info: {
                "Display": {
                    title: "Display",
                    visibility: "protected",
                    map: {
                        "Photo_URL": "",
                        "First_Name": "new",
                        "Middle_Name": "",
                        "Last_Name": "dog",
                        "Age": "",
                        "Summary": ""
                    }
                },
                "General": {
                    title: "General",
                    visibility: "public",
                    map: {
                        "Breeds": "",
                        "Colors": "",
                        "Pattern": "",
                        "Height": "",
                        "Weight": ""
                    }
                },
                "Health": {
                    title: "Health",
                    visibility: "public",
                    map: {
                        "Disease": "",
                        "Injury": "",
                        "Vaccines": ""
                    }
                },
                "Breeding": {
                    title: "Breeding",
                    visibility: "public",
                    map: {
                        "Breeding": ""
                    }
                },
                "Selling": {
                    title: "Selling",
                    visibility: "public",
                    map: {
                        "Selling": ""
                    }
                },
                "Posts": {
                    title: "Posts",
                    visibility: "private",
                    map: {},
                    array: []
                }
            },
            isHuman: false,
            uid: uid
        };
        window.db.collection('Person').doc(person.uid).set(JSON.parse('{"info": {"Dogs": {"map": {"' + uid + '": ' + JSON.stringify(person.info['Dogs'].map[uid]) + '}}}}'), { merge: true });
        loadAccount();
    });

    // Action
    if (window.loggedInPerson == window.currentPerson) {
        $('#action #settings').css('visibility', 'visible');
    } else {
        $('#action #settings').css('visibility', 'hidden');
    }

    $('#content').each(function() {
        $(this).empty();
        switch (selectedTab) {
            case 'profile':
                $(this).append('<div id="displayInfo"></div>');
                $('#content #displayInfo').each(function() {
                    var photo = account.info['Display'].map['Photo_URL'] != '' ? account.info['Display'].map['Photo_URL'] : 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png';
                    $(this).append('<div id="photo" style="float:left"><img src="' + photo + '" class="img-thumbnail img-md-cropped"></div>');
                    if (account.isHuman) {
                        $(this).append('<div id="firstLine">' + account.info['Display'].map['First_Name'] + ' ' + account.info['Display'].map['Last_Name'] + '</div>');
                        $(this).append('<div id="secondLine">' + account.info['Display'].map['Age'] + '</div>');
                        $(this).append('<div id="thirdLine">' + account.info['Address'].map['City'] + ', ' + account.info['Address'].map['State'] + '</div>');
                        $(this).append('<div id="fourthLine">' + account.info['Organization'].map['Organization'] + '</div>');
                    } else {
                        $(this).append('<div id="firstLine">' + account.info['Display'].map['First_Name'] + ' ' + account.info['Display'].map['Last_Name'] + '</div>');
                        $(this).append('<div id="secondLine">' + account.info['General'].map['Breeds'] + ', ' + account.info['Display'].map['Age'] + '</div>');
                        $(this).append('<div id="thirdLine"></div>'); // nothing on third line yet
                        $(this).append('<div id="fourthLine"></div>'); // nothing on fourth line yet
                    }
                    $(this).append('<div id="summary" style="float:right">' + account.info['Display'].map['Summary'] + '</div>');
                });
                $(this).append('<div id="comment" class="form-group"></div>');
                $('#content #comment').each(function() {
                    $(this).append('<textarea class="form-control" rows="3" style="resize:none" placeholder="Share something!"></textarea>');
                    $(this).append('<button id="post" class="btn btn-block btn-primary">Post</button>');
                    $('#content #comment #post').click(function() {
                        $('#content #wall').prepend('<div class="panel panel-primary"><div class="panel-heading col-sm-3">' + window.loggedInPerson.info['Display'].map['First_Name'] + ' ' + window.loggedInPerson.info['Display'].map['Last_Name'] + '</div><br><br><div class="post panel-body">' + $('#content #comment textarea').val().replace(/\n/g, '<br>') + '</div></div>');
                        var wall = account.info['Posts'].array;
                        wall.unshift(JSON.parse('{"poster": "' + window.loggedInPerson.info['Display'].map['First_Name'] + ' ' + window.loggedInPerson.info['Display'].map['Last_Name'] + '", "text": "' + $('#content #comment textarea').val().replace(/\n/g, '<br>') + '", "photo": null, "file": null}'));
                        var update = JSON.parse((account.isHuman ? '' : '{"info": {"Dogs": {"map": {"' + account.uid + '": ') + '{"info": {"Posts": {"array": ' + JSON.stringify(wall) + '}}}' + (account.isHuman ? '' : '}}}}'));
                        $('#content #comment textarea').val('');
                        window.db.collection('Person').doc(person.uid).set(update, { merge: true });
                    });
                });
                $(this).append('<div id="wall"></div>');
                if (account.info['Posts'] != null) {
                    for (i in account.info['Posts'].array) {
                        var post = account.info['Posts'].array[i];
                        $('#content #wall').append('<div class="panel panel-primary"><div class="panel-heading col-sm-3">' + post.poster + '</div><br><br><div class="post panel-body">' + post.text + '</div></div>');
                    }
                }
                break;
            case 'photos':
                for (i in account.photos) {
                    var photo = account.photos[i];
                    $(this).append('<img src="' + photo + '" class="img-thumbnail img-lg-cropped">');
                }
                break;
            case 'moreInfo':
                var hasMoreInfo = false;
                for (i in account.info) {
                    var info = account.info[i];
                    if (info.visibility == 'public') {
                        hasMoreInfo = true;
                        $(this).append('<div id="' + info.title + '" class="panel panel-primary"></div>');
                        $('#content #' + info.title).append('<div class="panel-heading">' + info.title + '</div>');
                        var contents = '';
                        for (key in info.map) {
                            var value = info.map[key];
                            contents += key + ': ' + value + '<br>';
                        }
                        contents = contents.replace(/<br>$/, '');
                        $('#content #' + info.title).append('<div class="panel-body">' + contents + '</div>');
                    }
                }
                if (!hasMoreInfo) {
                    $(this).append('<div id="warning" class="panel panel-secondary"></div>');
                    $('#content #warning').append('<div class="panel-body">This account doesn\'t have more infomation available.</div>');
                }
                break;
            case 'settings':
                var hasSettings = false;
                for (i in account.info) {
                    var info = account.info[i];
                    if (info.visibility == 'public' || info.visibility == 'protected') {
                        hasSettings = true;
                        $(this).append('<div id="' + info.title + '" class="panel panel-primary"></div>');
                        $('#content #' + info.title).each(function() {
                            $(this).append('<div class="panel-heading">' + info.title + '</div>');
                            $(this).append('<div id="' + info.title + '" class="panel-body"></div>');
                            $('#content #' + info.title + ' .panel-body').each(function() {
                                for (key in info.map) {
                                    var value = info.map[key];
                                    $(this).append('<div id="' + key + '" class="form-group"></div>');
                                    $('#content #' + info.title + ' .panel-body #' + key).each(function() {
                                        $(this).append('<label class="control-label col-sm-2">' + key + ':</label>');
                                        $(this).append('<div class="col-sm-10"><input type="text" class="form-control" value="' + value + '"></div>');
                                    });
                                }
                            });
                        });
                    }
                }
                $('#content .panel .panel-body .form-group div input').each(function() {
                    $(this).on('input', function() {
                        $(this).addClass('edited');
                    });
                });
                if (!hasSettings) {
                    $(this).append('<div id="warning" class="panel panel-secondary"></div>');
                    $('#content #warning').append('<div class="panel-body">This account doesn\'t have settings available.</div>');
                } else {
                    $(this).append('<div class="col-sm-2"><button id="save" class="btn btn-block btn-primary">Save</button></div>');
                    $('#save').click(function() {
                        var updatedEntries = '';
                        $('#content .panel').each(function() {
                            var info = $(this).attr('id');
                            updatedEntries += '"' + info + '": {"map": {';
                            $('#content #' + info + ' .panel-body .form-group').each(function() {
                                var key = $(this).attr('id');
                                $('#content #' + info + ' .panel-body #' + key + ' div .edited').each(function() {
                                    updatedEntries += '"' + key + '": "' + $(this).val() + '", ';
                                    account.info[info].map[key] = $(this).val();
                                });
                            });
                            updatedEntries = updatedEntries.replace(/, $/, '}}, ').replace(/"[^"]+": {"map": {$/, '');
                        });
                        updatedEntries = updatedEntries.replace(/, $/, '');
                        if (updatedEntries != '') {
                            var update = JSON.parse((account.isHuman ? '' : '{"info": {"Dogs": {"map": {"' + account.uid + '": ') + '{"info": {' + updatedEntries + '}}' + (account.isHuman ? '' : '}}}}'));
                            window.db.collection('Person').doc(person.uid).set(update, { merge: true });
                        }
                        loadAccount();
                    });
                }
                break;
        }
    });
}

function changeProfile(uid) {
    var account = window.currentPerson.uid == uid ? window.currentPerson : window.currentPerson.info['Dogs'].map[uid];
    loadAccount(window.currentPerson, account, window.currentTab);
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}