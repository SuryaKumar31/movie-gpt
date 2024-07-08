// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA16aXPMlkDmScUYIvfrtMoGBRl91vCQAY",
  authDomain: "movie-gpt-c8fe8.firebaseapp.com",
  projectId: "movie-gpt-c8fe8",
  storageBucket: "movie-gpt-c8fe8.appspot.com",
  messagingSenderId: "934102739376",
  appId: "1:934102739376:web:f2c58be5f720c52d5b0e75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()