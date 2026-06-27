import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-7Gck_bPA41CqwqSxu_VNhIIvLahUn54",
  authDomain: "expense-tracker-13915.firebaseapp.com",
  projectId: "expense-tracker-13915",
  storageBucket: "expense-tracker-13915.firebasestorage.app",
  messagingSenderId: "667166893668",
  appId: "1:667166893668:web:c27215b288bf46ed80e171",
  measurementId: "G-Q685P0HM8L"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);