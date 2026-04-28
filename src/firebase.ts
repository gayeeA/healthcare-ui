// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSfBTmgs3aXQ8jK7s6STEPNcrS8iHCRh4",
  authDomain: "healthcare-ui-2cbaa.firebaseapp.com",
  projectId: "healthcare-ui-2cbaa",
  storageBucket: "healthcare-ui-2cbaa.firebasestorage.app",
  messagingSenderId: "392763407321",
  appId: "1:392763407321:web:61a91c2f3aa024c28b77c8",
  measurementId: "G-70TCS1D6FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;