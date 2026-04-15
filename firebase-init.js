import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOQalg-tSym8QuJbwLVj2ugGeuqYt1-b4",
  authDomain: "meme-spin-pro.firebaseapp.com",
  projectId: "meme-spin-pro",
  storageBucket: "meme-spin-pro.firebasestorage.app",
  messagingSenderId: "984110738009",
  appId: "1:984110738009:web:aa19222443fb484c29df48"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

window.firebaseAuth = auth;
window.firebaseDb = db;
window.fbFns = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  serverTimestamp
};

console.log("firebase-init loaded", firebaseConfig.apiKey);