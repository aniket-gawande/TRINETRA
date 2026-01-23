import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgaIhPEvz74KGbDPXbu-5_B1rmGCsuqKI",
  authDomain: "trinetra-ebdd7.firebaseapp.com",
  projectId: "trinetra-ebdd7",
  storageBucket: "trinetra-ebdd7.appspot.com",
  messagingSenderId: "414795217533",
  appId: "1:414795217533:web:6e25ebfc05b666c2328f14",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
