// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_Y0OEr6gvfytaGoJPcT8LGr9vIojzizg",
  authDomain: "finalproject-b61ad.firebaseapp.com",
  projectId: "finalproject-b61ad",
  storageBucket: "finalproject-b61ad.appspot.com",
  messagingSenderId: "152056775861",
  appId: "1:152056775861:web:c403ddff4ef5aa0b56aafc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const provider = new GoogleAuthProvider;

export { auth,db,provider};