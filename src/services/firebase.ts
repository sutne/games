import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "@firebase/firestore";

require("dotenv").config();
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
};

export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export const firestore: Firestore = getFirestore(firebaseApp);
