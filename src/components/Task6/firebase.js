// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARqXCBIjkVl7LRkmXSYB9_g-e2FgmSiIw",
    authDomain: "to-do-list-c83f9.firebaseapp.com",
    projectId: "to-do-list-c83f9",
    storageBucket: "to-do-list-c83f9.appspot.com",
    messagingSenderId: "1054703314468",
    appId: "1:1054703314468:web:446e738412a6d7580c9ab1",
    measurementId: "G-YSM1ZDCFPJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;