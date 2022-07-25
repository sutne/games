import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export const firestore: Firestore = getFirestore(firebaseApp);
