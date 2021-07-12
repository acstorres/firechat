import firebase from "firebase/app";
import "firebase/database"

const config = {
    apiKey: "AIzaSyCwfHsZWTcvjuSiLVwjXqj41HmMGhgQJrE",
    authDomain: "firechat-e3ebf.firebaseapp.com",
    projectId: "firechat-e3ebf",
    storageBucket: "firechat-e3ebf.appspot.com",
    messagingSenderId: "392253562107",
    appId: "1:392253562107:web:de7b8bfd80290e861ee45e"
}

const db = firebase.initializeApp(config)
export default db