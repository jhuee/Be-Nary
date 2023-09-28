// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAabwUBlbT3H03ek8nVLo9GseZByzRZnSo",
  authDomain: "benary.firebaseapp.com",
  databaseURL: "https://benary-default-rtdb.firebaseio.com",
  projectId: "benary",
  storageBucket: "benary.appspot.com",
  messagingSenderId: "430771712308",
  appId: "1:430771712308:web:660ba52dc7eb076048f561",
  measurementId: "G-GQF5C7TJ3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const dbUser = getFirestore(app);
