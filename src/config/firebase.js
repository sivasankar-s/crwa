import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";


export const firebaseConfig = {
  apiKey: "AIzaSyChz-rtmzNwLpX4snwgkb_TDylkLlwTFkA",
  authDomain: "crwa-face9.firebaseapp.com",
  projectId: "crwa-face9",
  storageBucket: "crwa-face9.appspot.com",
  messagingSenderId: "376185476577",
  appId: "1:376185476577:web:ea3112e4ed6974c8ddaea0",
  measurementId: "G-HGT7FJF18J"
};

// var admin = require("firebase-admin");

// var serviceAccount = require("config/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
