// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGc3IvfzwumFkegFjxLaKPt9-Q2XuH0pk",
  authDomain: "pitstop-ac1da.firebaseapp.com",
  databaseURL: "https://pitstop-ac1da-default-rtdb.firebaseio.com",
  projectId: "pitstop-ac1da",
  storageBucket: "pitstop-ac1da.appspot.com",
  messagingSenderId: "264788682772",
  appId: "1:264788682772:web:94af50d8342b58ae201f01",
  measurementId: "G-6HRLL9M8WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let pickUpsCollection;

if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  const database = getFirestore(app);
  pickUpsCollection = collection(database, "pick_ups");
}

export { pickUpsCollection };
