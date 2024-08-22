// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA76QXk8VFNUMxtXoqgeEANG152rL8dYiQ",    
  authDomain: "candidate-form-a8bdb.firebaseapp.com",
  projectId: "candidate-form-a8bdb",
  storageBucket: "candidate-form-a8bdb.appspot.com",
  messagingSenderId: "2695090823",
  appId: "1:2695090823:web:de6e0893f19ad72a449e22",
  measurementId: "G-1H8K11H5XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

