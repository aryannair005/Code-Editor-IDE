import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "code-editor-2ee8c.firebaseapp.com",
  projectId: "code-editor-2ee8c",
  storageBucket: "code-editor-2ee8c.firebasestorage.app",
  messagingSenderId: "505077700642",
  appId: "1:505077700642:web:baf31e7f57e561a27a127b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()