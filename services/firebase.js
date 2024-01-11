import { getFirestore  } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdmc0I1WSMzw72BDbNZyace4wnPymgkbs",
  authDomain: "pet-ly.firebaseapp.com",
  projectId: "pet-ly",
  storageBucket: "pet-ly.appspot.com",
  messagingSenderId: "1062852889336",
  appId: "1:1062852889336:web:0003b2448c2de51a94490d",
  measurementId: "G-Z71YKL6QM6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();