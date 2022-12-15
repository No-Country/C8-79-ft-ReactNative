// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_KEY,FauthDomain,FprojectId,FstorageBucket,FmessagingSenderId,FappId } from "@env";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain:FauthDomain,
  projectId:FprojectId ,
  storageBucket:FstorageBucket ,
  messagingSenderId:FmessagingSenderId ,
  appId: FappId
};



const app = initializeApp(firebaseConfig);



export const auth = initializeAuth(app, {

  persistence: getReactNativePersistence(AsyncStorage)

});

export const db = getFirestore(app);

//