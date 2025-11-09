import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCP8fVicDtwp23RMZJjv2MMv9tMpH52IYw",
  authDomain: "assigment-dd334.firebaseapp.com",
  projectId: "assigment-dd334",
  storageBucket: "assigment-dd334.firebasestorage.app",
  messagingSenderId: "403422169165",
  appId: "1:403422169165:web:3f8b6d200e0baefb05b404",
  measurementId: "G-DZ331EEE07"
};


const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth(app);