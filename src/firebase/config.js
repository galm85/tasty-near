// src/firebase/config.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ193GeMzpZVmnZ6FIBJOejIHsDxjE76Y",
  authDomain: "testy-near.firebaseapp.com",
  projectId: "testy-near",
  storageBucket: "testy-near.firebasestorage.app",
  messagingSenderId: "977006888034",
  appId: "1:977006888034:web:21446ddeae5e226fb9bd3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;