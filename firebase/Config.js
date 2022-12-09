// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAMY-gOgiPn5YtnlRO0DkD5zjyi0tifwh0",

  authDomain: "react-native-c23eb.firebaseapp.com",

  projectId: "react-native-c23eb",

  storageBucket: "react-native-c23eb.appspot.com",

  messagingSenderId: "346874723095",

  appId: "1:346874723095:web:e9e4641a78bbd92dc19552"
};



const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {

  persistence: getReactNativePersistence(AsyncStorage)

});

export const db = getFirestore(app);
//