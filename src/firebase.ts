// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import 'firebase/firestore'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm1lD8kYhIElzSHKmmxZBm53xk4LmcCb0",
  authDomain: "carefinda-968fb.firebaseapp.com",
  projectId: "carefinda-968fb",
  storageBucket: "carefinda-968fb.appspot.com",
  messagingSenderId: "97748295383",
  appId: "1:97748295383:web:9fdb2b615bdc9e45565a92",
  measurementId: "G-PQJTXHFDGH",
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth()
export const storage = getStorage(app)


