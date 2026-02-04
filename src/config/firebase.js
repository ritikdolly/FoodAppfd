// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGLxECKwFw8wk6geL9dOnSMpW6hl9VUac",
  authDomain: "foodapp-26ed5.firebaseapp.com",
  projectId: "foodapp-26ed5",
  storageBucket: "foodapp-26ed5.firebasestorage.app",
  messagingSenderId: "196328434697",
  appId: "1:196328434697:web:9b220feecbf6dd1cefdcd8",
  measurementId: "G-Z0VKYFRND3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
