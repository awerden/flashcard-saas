// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZrGlD-WyFw7BF4UUdxuABnZDHDCNIs8Y",
  authDomain: "flashcardsaas-f4cde.firebaseapp.com",
  projectId: "flashcardsaas-f4cde",
  storageBucket: "flashcardsaas-f4cde.appspot.com",
  messagingSenderId: "241765430576",
  appId: "1:241765430576:web:23b829932d1ad2b255c4f5",
  measurementId: "G-C6DTBD9S9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}