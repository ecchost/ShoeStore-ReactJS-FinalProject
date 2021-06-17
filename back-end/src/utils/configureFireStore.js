import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore"

const config = {
    databaseURL: "https://uas-react-e53ed-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyDXTjGUoY3m2dmGKZ_YdsGkA3-itxUqQ0U",
    authDomain: "uas-react-e53ed.firebaseapp.com",
    projectId: "uas-react-e53ed",
    storageBucket: "uas-react-e53ed.appspot.com",
    messagingSenderId: "282278943994",
    appId: "1:282278943994:web:d182d015df040f1d4fbd43",
    measurementId: "G-PWCCXDV9L3"
}
export const myFirebase = firebase.initializeApp(config)
const baseDb = myFirebase.firestore()
export const db = baseDb