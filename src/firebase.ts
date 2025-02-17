import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAj2FnW0LwyYuMfDSwtDldfZgf465dJexY",
  authDomain: "demodata-663fe.firebaseapp.com",
  projectId: "demodata-663fe",
  storageBucket: "demodata-663fe.firebasestorage.app",
  messagingSenderId: "528841754762",
  appId: "1:528841754762:web:b78439133aa1a999868573",
  measurementId: "G-29R3R1D79J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Authentication functions
export const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};
