import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDUL2klk8IkjGC2SY23JYa5lgsqhJlBQXw",
  authDomain: "my-app-d49ef.firebaseapp.com",
  projectId: "my-app-d49ef",
  storageBucket: "my-app-d49ef.appspot.com",
  messagingSenderId: "243314675635",
  appId: "1:243314675635:web:988fe85c222df54df285c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app