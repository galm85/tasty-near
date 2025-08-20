// src/services/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Sign up new user
export const signUpUser = async (email, password, userData) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, 'customers', user.uid), {
      name: userData.name,
      email: email,
      phone: userData.phone || '',
      addresses: [],
      createdAt: new Date()
    });
    
    return user;
  } catch (error) {
    throw new Error('Signup failed: ' + error.message);
  }
};

// Sign in existing user
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

// Sign out
export const signOutUser = async () => {
  return await signOut(auth);
};

// Get current user data from Firestore
export const getUserData = async (uid) => {
  const docRef = doc(db, 'customers', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};