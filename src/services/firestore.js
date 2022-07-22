import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
