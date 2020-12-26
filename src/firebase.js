import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyAWnheG6LIwYugtcdCkgvDRNqtWg55zQ7M",
    authDomain: "auth-496d2.firebaseapp.com",
    projectId: "auth-496d2",
    storageBucket: "auth-496d2.appspot.com",
    messagingSenderId: "863827324907",
    appId: "1:863827324907:web:092f288ea6f16abcdcf3ae"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
