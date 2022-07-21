// Import the functions you need from the SDKs you need
import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAfDSfRlaM9s97YJ_UNV5YvMm1qvBycVc",
  authDomain: "teercommon-1519e.firebaseapp.com",
  databaseURL: "https://teercommon-1519e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "teercommon-1519e",
  storageBucket: "teercommon-1519e.appspot.com",
  messagingSenderId: "13067739313",
  appId: "1:13067739313:web:2439a3fca7267100918290",
  measurementId: "G-NFPRNJJHXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app)
const auth = getAuth(app);




//CutomHook 
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, []);
  return currentUser;
}

export function logOut() {
  return signOut(auth);
}

export { db, auth }