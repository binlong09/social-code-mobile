import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBE_DUc5Yq8tiTyWqojuq2rPIR-hHPJpjY",
  authDomain: "social-code-25274.firebaseapp.com",
  databaseURL: "https://social-code-25274.firebaseio.com",
  storageBucket: "social-code-25274.appspot.com",
  projectId: "social-code-25274",
  messagingSenderId: "185161900082",
  appId: "1:185161900082:web:4c3a99760701dab69c1c2b",
  measurementId: "G-NKKWMSRF2V"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();