// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDEdwe8Wqep4SDmTDe2Ld3t75X8Y_rpnP0",
    authDomain: "echolynk-cf3ca.firebaseapp.com",
    projectId: "echolynk-cf3ca",
    storageBucket: "echolynk-cf3ca.appspot.com",
    messagingSenderId: "403359480178",
    appId: "1:403359480178:web:adc7a005a98e0f15bdc5eb",
    measurementId: "G-6HD5F25FMJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };