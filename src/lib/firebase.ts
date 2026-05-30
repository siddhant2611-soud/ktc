import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDjEJsR7J1vCF4pktciBQUUGCcvUPWWvus",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kaushik-transport.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kaushik-transport",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kaushik-transport.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "753499633454",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:753499633454:web:80ff02a61d3eede7856cbf",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-G4VQR45WV9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
