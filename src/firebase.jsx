import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "foodvista-d7117.firebaseapp.com",
    projectId: "foodvista-d7117",
    storageBucket: "foodvista-d7117.appspot.com",
    messagingSenderId: "14653481032",
    appId: "1:14653481032:web:6c9dbe6c1dbf8bee8a787d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);