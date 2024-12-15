import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: Cypress.env("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: Cypress.env("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: Cypress.env("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: Cypress.env("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: Cypress.env("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: Cypress.env("NEXT_PUBLIC_FIREBASE_APP_ID"),
  measurementId: Cypress.env("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID"),
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
