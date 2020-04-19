/* File: FirebaseInitialize.js
 * Created: 4-19-2020
 * Description: Initializes Firebase configuration for service pages that
 * require authentication or database connectivity.
 *  - JQuery 3.14
 *  - Bootstrap 3.4.1
 *  - Firebase 7.14.0
 */

// CanineConnection Firebase configuration
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
