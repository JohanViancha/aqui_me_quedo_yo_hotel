// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt9EImI8cuA5xMtyT5Qv3H_6GK66xsMRE",
  authDomain: "clima-95956.firebaseapp.com",
  databaseURL: "https://clima-95956-default-rtdb.firebaseio.com",
  projectId: "clima-95956",
  storageBucket: "clima-95956.appspot.com",
  messagingSenderId: "345980094646",
  appId: "1:345980094646:web:f0949f6ad6446f5608be17",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);

export { app, db, auth };
