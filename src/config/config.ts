// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.Firebase_API,
  authDomain: "artviewer-249d0.firebaseapp.com",
  projectId: "artviewer-249d0",
  storageBucket: "artviewer-249d0.appspot.com",
  messagingSenderId: "145098641522",
  appId: "1:145098641522:web:1b1b70bd0905f0c943f2eb",
  measurementId: "G-X65B4YBY5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);