import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCrxCR_AbNoMD60ALOEp7zfyYLKclwmaE",
  authDomain: "personal-tracker-445a5.firebaseapp.com",
  projectId: "personal-tracker-445a5",
  storageBucket: "personal-tracker-445a5.firebasestorage.app",
  messagingSenderId: "1074520533915",
  appId: "1:1074520533915:web:67d8584199709ac8fc0f3e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
