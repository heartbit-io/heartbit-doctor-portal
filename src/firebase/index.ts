import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9D6ZTyXo8dulgsQywxmSzvjYC6Fq0pwk",
  authDomain: "heartbit-wallet-dev.firebaseapp.com",
  projectId: "heartbit-wallet-dev",
  storageBucket: "heartbit-wallet-dev.appspot.com",
  messagingSenderId: "54710886479",
  appId: "1:54710886479:web:f077792312281e05f98a3a",
  measurementId: "G-1XBL5EHHMG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
