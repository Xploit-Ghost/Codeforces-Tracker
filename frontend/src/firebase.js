import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUVcQuBCrXtfG1WoXdsNyhTFfWEOKCY3M",
  authDomain: "cp-tracker-5e1b5.firebaseapp.com",
  projectId: "cp-tracker-5e1b5",
  storageBucket: "cp-tracker-5e1b5.firebasestorage.app",
  messagingSenderId: "915852674728",
  appId: "1:915852674728:web:ea5a4f7d3d1b9f3395e49d",
  measurementId: "G-90VQ82F344"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
