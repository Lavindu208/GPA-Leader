// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdJxTnBgG_ZAY5PMPDVE6VxWCNiT2UL8U",
  authDomain: "gpa-leader.firebaseapp.com",
  projectId: "gpa-leader",
  storageBucket: "gpa-leader.firebasestorage.app",
  messagingSenderId: "976973437716",
  appId: "1:976973437716:web:734738fe6c08b9742ac001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);