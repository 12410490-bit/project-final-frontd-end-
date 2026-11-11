import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAX5Jvg6VPC53OQOcVUFgG4vB4bVb8_eoI",
  authDomain: "nutritrack-ai-a56d9.firebaseapp.com",
  projectId: "nutritrack-ai-a56d9",
  storageBucket: "nutritrack-ai-a56d9.firebasestorage.app",
  messagingSenderId: "1047179843830",
  appId: "1:1047179843830:web:d01c39d4832f7e08b534d7",
  measurementId: "G-3YDVBQQTZL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);