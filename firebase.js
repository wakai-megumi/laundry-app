// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcMjkolUBkh-Gvd3pk-Uap6aiKgqS-tig",
    authDomain: "laundry-app-3e3a0.firebaseapp.com",
    projectId: "laundry-app-3e3a0",
    storageBucket: "laundry-app-3e3a0.appspot.com",
    messagingSenderId: "88282803421",
    appId: "1:88282803421:web:ce09e63918690f2095bf34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app)

export { auth, db, createUserWithEmailAndPassword }