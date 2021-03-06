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
    //firebase.initializeApp(firebaseConfig);
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
            window.location.href = "https://beck-peterson.github.io/gui2/landing/LandingOut.html";
        }
    });

    $('#action button').click(function() {
        loadAccount(window.currentPerson, window.currentAccount, $(this).attr('id'));
    });
});

function logout() {
  const auth = firebase.auth();
  auth.signOut().then(() => {
      console.log('user pressed the log out button');
  });
}

function settingsMessage() {
    if (!deepEqual(window.loggedInPerson, window.currentPerson)) {
        messages();
    }
}

// This function can accept person or dog accounts
function loadAccount(person = window.currentPerson, account = window.currentAccount, selectedTab = window.currentTab) {
    window.currentPerson = person.uid == window.loggedInPerson.uid ? window.loggedInPerson : person;
    window.currentAccount = account.uid == window.loggedInPerson.uid ? window.loggedInPerson : account;
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
            $(this).append('<li id="' + person.uid + '" class="col-sm-12"><a href="#" onclick="changeProfile(\'' + person.uid + '\')">' + person.info['Display'].value.map['First_Name'].value + ' ' + person.info['Display'].value.map['Last_Name'].value + '</a></li>');
            if (person.info['Dogs'].value != null) {
                for (let i of Array.from(Object.getOwnPropertyNames(person.info['Dogs'].value.map)).sort((a, b) => person.info['Dogs'].value.map[a].order - person.info['Dogs'].value.map[b].order)) {
                    var dog = person.info['Dogs'].value.map[i].value;
                    $(this).append('<li id="' + dog.uid + '" class="col-sm-10 dogLI"><a href="#" onclick="changeProfile(\'' + dog.uid + '\')"><i class="fa fa-lg fa-paw"></i> ' + dog.info['Display'].value.map['First_Name'].value + '</a></li>');
                }
            }
        });

    });
    $('#information #subProfiles ul #' + account.uid).addClass('active');
    if (deepEqual(window.loggedInPerson, window.currentPerson)) {
        $('#information').append('<div class="col-sm-12"><button id="addDog" class="btn btn-block btn-primary" style="width:7.65em"><i class="fa fa-lg fa-paw"></i> Add Dog</button></div>');
        $('#information #addDog').click(function() {
            var uid = generateUUID();
            var i = 0;
            person.info['Dogs'].value.map[uid] = {
                value: {
                    photos: [],
                    info: {
                        "Display": {
                            value: {
                                title: "Display",
                                visibility: "protected",
                                map: {
                                    "Photo_URL": {
                                        value: "",
                                        order: i++
                                    },
                                    "First_Name": {
                                        value: "NEW",
                                        order: i++
                                    },
                                    "Middle_Name": {
                                        value: "",
                                        order: i++
                                    },
                                    "Last_Name": {
                                        value: "",
                                        order: i++
                                    },
                                    "Age": {
                                        value: "",
                                        order: i++
                                    },
                                    "Summary": {
                                        value: "",
                                        order: i++
                                    }
                                }
                            },
                            order: i++
                        },
                        "General": {
                            value: {
                                title: "General",
                                visibility: "public",
                                map: {
                                    "Breeds": {
                                        value: "",
                                        order: i++
                                    },
                                    "Colors": {
                                        value: "",
                                        order: i++
                                    },
                                    "Pattern": {
                                        value: "",
                                        order: i++
                                    },
                                    "Height": {
                                        value: "",
                                        order: i++
                                    },
                                    "Weight": {
                                        value: "",
                                        order: i++
                                    }
                                }
                            },
                            order: i++
                        },
                        "Health": {
                            value: {
                                title: "Health",
                                visibility: "public",
                                map: {
                                    "Disease": {
                                        value: "",
                                        order: i++
                                    },
                                    "Injury": {
                                        value: "",
                                        order: i++
                                    },
                                    "Vaccines": {
                                        value: "",
                                        order: i++
                                    }
                                }
                            },
                            order: i++
                        },
                        "Breeding": {
                            value: {
                                title: "Breeding",
                                visibility: "public",
                                map: {
                                    "Breeding": {
                                        value: "",
                                        order: i++
                                    }
                                }
                            },
                            order: i++
                        },
                        "Selling": {
                            value: {
                                title: "Selling",
                                visibility: "public",
                                map: {
                                    "Selling": {
                                        value: "",
                                        order: i++
                                    }
                                }
                            },
                            order: i++
                        },
                        "Posts": {
                            value: {
                                title: "Posts",
                                visibility: "private",
                                map: {},
                                array: []
                            },
                            order: i++
                        }
                    },
                    owner: person.uid,
                    uid: uid
                },
                order: Object.getOwnPropertyNames(person.info['Dogs'].value.map).length
            };
            window.db.collection('Dog').doc(uid).set(person.info['Dogs'].value.map[uid].value);
            window.db.collection('Person').doc(person.uid).set(JSON.parse('{"info": {"Dogs": {"value": {"map": {"' + uid + '": {"value": ' + JSON.stringify(person.info['Dogs'].value.map[uid].value) + '}}}}}}'), { merge: true });
            loadAccount(person, person.info['Dogs'].value.map[uid].value, 'settingsMessage');
        });
    }

    // Action
    $('#action #settingsMessage').html(deepEqual(window.loggedInPerson, window.currentPerson) ? 'Settings' : 'Message');
    $('#action button').each(function() {
        $(this).removeClass('btn-outline-primary');
        $(this).addClass('btn-primary');
    });
    $('#action #' + selectedTab).each(function() {
        $(this).removeClass('btn-primary');
        $(this).addClass('btn-outline-primary');
    });

    $('#content').each(function() {
        $(this).empty();
        switch (selectedTab) {
            case 'profile':
                $(this).append('<div id="displayInfo"></div>');
                $('#content #displayInfo').each(function() {
                    var photo = account.info['Display'].value.map['Photo_URL'].value != '' ? account.info['Display'].value.map['Photo_URL'].value : 'https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png';
                    const auth = firebase.auth();
                    auth.currentUser.updateProfile({
                       photoURL: photo
                    });
                    $(this).append('<div id="photo" style="float:left; margin-bottom:15px; margin-right:15px;"><img src="' + photo + '" class="img-thumbnail img-md-cropped"></div>');
                    $(this).append('<div id="summary" style="float:right"><h4 style="font-weight:bold"></h4></div>');
                    $('#content #displayInfo #summary h4').each(function() {
                        var words = account.info['Display'].value.map['Summary'].value.split(' ');
                        var lineBrokeText = '';
                        var currentLine = '';
                        for (let word of words) {
                            if ((currentLine + ' ' + word).length <= 50) {
                                currentLine += ' ' + word;
                            } else {
                                lineBrokeText += currentLine + '<br>';
                                currentLine = word;
                            }
                        }
                        lineBrokeText += currentLine;
                        lineBrokeText = lineBrokeText.replace(/<br>$/, '');
                        $(this).html(lineBrokeText);
                    });
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
                $(this).append('<div class="col-sm-12"></div>');
                $(this).append('<div id="comment" class="form-group"></div>');
                $('#content #comment').each(function() {
                    $(this).append('<div class="col-sm-3" style="padding-left:0px; padding-right:0px;"><select class="form-control form-control-lg"></select></div>');
                    $('#content #comment div select').each(function() {
                        $(this).append('<option selected="" value="' + window.loggedInPerson.uid + '">' + window.loggedInPerson.info['Display'].value.map['First_Name'].value + ' ' + window.loggedInPerson.info['Display'].value.map['Last_Name'].value + '</option>');
                        if (window.loggedInPerson.info['Dogs'].value != null) {
                            for (let i of Array.from(Object.getOwnPropertyNames(window.loggedInPerson.info['Dogs'].value.map)).sort((a, b) => window.loggedInPerson.info['Dogs'].value.map[a].order - window.loggedInPerson.info['Dogs'].value.map[b].order)) {
                                var dog = window.loggedInPerson.info['Dogs'].value.map[i].value;
                                $(this).append('<option value="' + dog.uid + '">' + dog.info['Display'].value.map['First_Name'].value + ' ' + dog.info['Display'].value.map['Last_Name'].value + '</option>');
                            }
                        }
                    });
                    $(this).append('<div class="form-check" style="float:right"><label class="form-check-label" for="check" style="padding:5px">Private</label><input class="form-check-input" type="checkbox" value="" id="check"></div>');
                    $('#content #comment div input').click(function() {
                        $('#content #comment #post').removeClass('btn-primary');
                        $('#content #comment #post').removeClass('btn-warning');
                        $('#content #comment #post').addClass(!$('#content #comment div input').is(":checked") ? 'btn-primary' : 'btn-default');
                    });
                    $(this).append('<textarea class="form-control" rows="3" style="resize:none" placeholder="Share something!"></textarea>');
                    $(this).append('<button id="post" class="btn btn-block btn-primary">Post</button>');
                    $('#content #comment #post').click(function() {
                        $('#content #wall').prepend('<div class="panel panel-primary"><div class="panel-heading col-sm-3"><a href="#" class="noDeco" onclick="loadAccountFromUID(\'' + window.loggedInPerson.uid + '\', \'' + $('#content #comment div select').val() + '\')">' + $('#content #comment div select option:selected').text() + '</a></div><br><br><div class="post panel-body">' + $('#content #comment textarea').val().replace(/\n/g, '<br>') + '</div></div>');
                        var wall = account.info['Posts'].value.array;
                        wall.unshift(JSON.parse('{"ownerUID": "' + window.loggedInPerson.uid + '", "accountUID": "' + $('#content #comment div select').val() + '", "name": "' + $('#content #comment div select option:selected').text() + '", "text": "' + $('#content #comment textarea').val().replace(/\n/g, '<br>') + '", "private": ' + $('#content #comment div input').is(":checked") + ', "photo": null, "file": null}'));
                        var update = JSON.parse((account.owner == null ? '' : '{"info": {"Dogs": {"value": {"map": {"' + account.uid + '": {"value": ') + '{"info": {"Posts": {"value": {"array": ' + JSON.stringify(wall) + '}}}}' + (account.owner == null ? '' : '}}}}}}'));
                        $('#content #comment textarea').val('');
                        window.db.collection('Person').doc(person.uid).set(update, { merge: true });
                    });
                });
                $(this).append('<div id="wall"></div>');
                if (account.info['Posts'].value != null) {
                    for (i in account.info['Posts'].value.array) {
                        var post = account.info['Posts'].value.array[i];
                        if (!post.private || (window.loggedInPerson.uid == person.uid) || (window.loggedInPerson.uid == post.ownerUID)) {
                            $('#content #wall').append('<div class="panel ' + (!post.private ? 'panel-primary' : 'panel-default') + '"><div class="panel-heading col-sm-3"><a href="#" class="noDeco" onclick="loadAccountFromUID(\'' + post.ownerUID + '\', \'' + post.accountUID + '\')">' + post.name + '</a></div><br><br><div class="post panel-body">' + post.text + '</div></div>');
                        }
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
                for (let i of Array.from(Object.getOwnPropertyNames(account.info)).sort((a, b) => account.info[a].order - account.info[b].order)) {
                    var info = account.info[i].value;
                    if (info.visibility == 'public') {
                        hasMoreInfo = true;
                        $(this).append('<div id="' + info.title + '" class="panel panel-primary"></div>');
                        $('#content #' + info.title).append('<div class="panel-heading">' + info.title + '</div>');
                        var contents = '';
                        for (let key of Array.from(Object.getOwnPropertyNames(info.map)).sort((a, b) => info.map[a].order - info.map[b].order)) {
                            var value = info.map[key].value;
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
            case 'settingsMessage':
                var hasSettings = false;
                for (let i of Array.from(Object.getOwnPropertyNames(account.info)).sort((a, b) => account.info[a].order - account.info[b].order)) {
                    var info = account.info[i].value;
                    if (info.visibility == 'public' || info.visibility == 'protected') {
                        hasSettings = true;
                        $(this).append('<div id="' + info.title + '" class="panel panel-primary"></div>');
                        $('#content #' + info.title).each(function() {
                            $(this).append('<div class="panel-heading">' + info.title + '</div>');
                            $(this).append('<div id="' + info.title + '" class="panel-body"></div>');
                            $('#content #' + info.title + ' .panel-body').each(function() {
                                for (let key of Array.from(Object.getOwnPropertyNames(info.map)).sort((a, b) => info.map[a].order - info.map[b].order)) {
                                    var value = info.map[key].value;
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
                        $('#save').prop('disabled', false);
                    });
                });
                if (!hasSettings) {
                    $(this).append('<div id="warning" class="panel panel-secondary"></div>');
                    $('#content #warning').append('<div class="panel-body">This account doesn\'t have settings available.</div>');
                } else {
                    $(this).append('<div class="col-sm-2"><button id="save" class="btn btn-block btn-primary">Save</button></div>');
                    $('#save').prop('disabled', true);
                    $('#save').click(function() {
                        var updatedEntries = '';
                        $('#content .panel').each(function() {
                            var info = $(this).attr('id');
                            updatedEntries += '"' + info + '": {"value": {"map": {';
                            $('#content #' + info + ' .panel-body .form-group').each(function() {
                                var key = $(this).attr('id');
                                $('#content #' + info + ' .panel-body #' + key + ' div .edited').each(function() {
                                    updatedEntries += '"' + key + '": {"value": "' + $(this).val() + '"}, ';
                                    account.info[info].value.map[key].value = $(this).val();
                                });
                            });
                            updatedEntries = updatedEntries.replace(/, $/, '}}}, ').replace(/"[^"]+": {"value": {"map": {$/, '');
                        });
                        updatedEntries = updatedEntries.replace(/, $/, '');
                        if (updatedEntries != '') {
                            if (account.owner == null) {
                                var update = JSON.parse('{"info": {' + updatedEntries + '}}');
                                window.db.collection('Person').doc(account.uid).set(update, { merge: true });
                            } else {
                                window.db.collection('Person').doc(person.uid).set(JSON.parse('{"info": {"Dogs": {"value": {"map": {"' + account.uid + '": {"value": {"info": {' + updatedEntries + '}}}}}}}}'), { merge: true });
                                window.db.collection('Dog').doc(account.uid).set(JSON.parse('{"info": {' + updatedEntries + '}}'), { merge: true });
                            }
                        }
                        loadAccount();
                        $(this).prop('disabled', true);
                    });
                    if (account.owner != null) {
                        $(this).append('<div class="col-sm-8"></div>');
                        $(this).append('<div class="col-sm-2"><button id="delete" class="btn btn-block btn-danger">Delete</button></div>');
                        $('#delete').click(function() {
                            if ($(this).hasClass('confirm')) {
                                window.db.collection('Dog').doc(account.uid).delete().then(function() {
                                    console.log("Document successfully deleted!");
                                }).catch(function(error) {
                                    console.error("Error removing document: ", error);
                                });
                                delete person.info['Dogs'].value.map[account.uid];
                                //window.db.collection('Person').doc(person.uid).set(JSON.parse('{"info": {"Dogs": {"value": {"map": ' + JSON.stringify(person.info['Dogs'].value.map) + '}}}}'), { merge: true });
                                //window.db.collection('Person').doc(person.uid).set(JSON.parse('{"info": {"Dogs": {"value": {"map": {"' + account.uid + '": ' + JSON.stringify(firebase.firestore.FieldValue.delete()) + '}}}}}'), { merge: true });

                                // I ultimately went with this because the first option changed nothing, and the second option added '"aa": "FieldValue.delete"' into the dog in the database rather than actually deleting it
                                window.db.collection('Person').doc(person.uid).set({info: {Dogs: {value: {map: {[account.uid]: firebase.firestore.FieldValue.delete()}}}}}, { merge: true });
                                loadAccount(person, person, 'profile');
                            } else {
                                $(this).addClass('confirm');
                                $(this).html('Confirm');
                            }
                        });
                    }
                }
                break;
        }
    });
}

function loadAccountFromUID(ownerUID, accountUID) {
    var docRef = window.db.collection('Person').doc(ownerUID);
    docRef.get().then(function(owner) {
        if (owner.exists) {
            if (ownerUID == accountUID) {
                loadAccount(owner.data(), owner.data(), "profile");
            } else {
                var docRef = window.db.collection('Dog').doc(accountUID);
                docRef.get().then(function(account) {
                    if (account.exists) {
                        loadAccount(owner.data(), account.data(), "profile");
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                }).catch(function(error) {
                    console.log('Error getting document:', error);
                });
            }
        } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
        }
    }).catch(function(error) {
        console.log('Error getting document:', error);
    });
}

function changeProfile(uid) {
    var account = window.currentPerson.uid == uid ? window.currentPerson : window.currentPerson.info['Dogs'].value.map[uid].value;
    loadAccount(window.currentPerson, account, window.currentTab);
}

// Function grabbed from online
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
