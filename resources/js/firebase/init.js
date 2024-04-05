// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0ulwc7mzEjiH7qO2i8oPkl2juV9Oy0hI",
  authDomain: "social-login-7ec14.firebaseapp.com",
  projectId: "social-login-7ec14",
  storageBucket: "social-login-7ec14.appspot.com",
  messagingSenderId: "141146005909",
  appId: "1:141146005909:web:0c53e45ad2e160a072169c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);//initialize firebase auth
const auth = getAuth()

export { app, auth}
