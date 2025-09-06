// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrP5AlWd28VWE4-Gen2OHMxw402re8Nu8",
  authDomain: "expense-tracker-95a3e.firebaseapp.com",
  projectId: "expense-tracker-95a3e",
  storageBucket: "expense-tracker-95a3e.firebasestorage.app",
  messagingSenderId: "7271592593",
  appId: "1:7271592593:web:427824fd9951877f97c530"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

