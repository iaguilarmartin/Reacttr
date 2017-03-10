import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyB06xyEtfaXOoO_YmW0TxgXjQOZLXJqE8c",
    authDomain: "curso-react-25aa9.firebaseapp.com",
    databaseURL: "https://curso-react-25aa9.firebaseio.com",
    storageBucket: "curso-react-25aa9.appspot.com",
    messagingSenderId: "52179802307"
});

import App from './components/App'

render(<App />, document.getElementById("root"));