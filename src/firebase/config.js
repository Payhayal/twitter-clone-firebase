// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "twitter-clone-1e9a1.firebaseapp.com",
  projectId: "twitter-clone-1e9a1",
  storageBucket: "twitter-clone-1e9a1.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authenticatioun setup, yetkilendirme kurulumu
export const auth = getAuth(app);
// google provider setup
export const googleProvider = new GoogleAuthProvider();
// veritabani(database)kurulumu
export const db = getFirestore(app);
// medya depolama alani kurulumu
export const storage = getStorage(app);
