// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBVep0VBEbHu5hk7VXver5vE4d9BimudtA",
  authDomain: "c8-79-react-native.firebaseapp.com",
  projectId: "c8-79-react-native",
  storageBucket: "c8-79-react-native.appspot.com",
  messagingSenderId: "326484106808",
  appId: "1:326484106808:web:248533195fa692282510cd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);