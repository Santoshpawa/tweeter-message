
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs//11.8.1/firebase-auth.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA6MdZ62XZj5qMShHWebaz6nrjWOoRVBa4",
    authDomain: "tweeter-message.firebaseapp.com",
    projectId: "tweeter-message",
    storageBucket: "tweeter-message.firebasestorage.app",
    messagingSenderId: "539097243023",
    appId: "1:539097243023:web:93aa84dbcd42efc8b3bffa"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);