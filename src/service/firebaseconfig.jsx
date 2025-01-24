import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDJkwJHrfVB0Ck7ZfurMmUcrW6ATFxAfXg",
    authDomain: "trip-71992.firebaseapp.com",
    projectId: "trip-71992",
    storageBucket: "trip-71992.firebasestorage.app",
    messagingSenderId: "430898990587",
    appId: "1:430898990587:web:b7cc92ac199dec3767cf5e",
    measurementId: "G-2EEBM9DPLF"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const db =getFirestore(app);