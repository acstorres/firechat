import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase";


const config = {
    apiKey: "AIzaSyCwfHsZWTcvjuSiLVwjXqj41HmMGhgQJrE",
    authDomain: "firechat-e3ebf.firebaseapp.com",
    projectId: "firechat-e3ebf",
    storageBucket: "firechat-e3ebf.appspot.com",
    messagingSenderId: "392253562107",
    appId: "1:392253562107:web:de7b8bfd80290e861ee45e"
}

firebase.initializeApp(config)

createApp(App).use(router).mount('#app')
