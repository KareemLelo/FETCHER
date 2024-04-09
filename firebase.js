// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ_337Ofd5ljZD675XYiQKLt6JHtV3eDY",
  authDomain: "fetcher-webapp.firebaseapp.com",
  projectId: "fetcher-webapp",
  storageBucket: "fetcher-webapp.appspot.com",
  messagingSenderId: "494276855584",
  appId: "1:494276855584:web:8883e881dd67d357d6b945",
  measurementId: "G-2S4YNX21B8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);