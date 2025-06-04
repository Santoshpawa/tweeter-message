import { auth, db } from "./firebase-config.js";

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', ()=>{
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if(loginBtn){
        loginBtn.addEventListener('click', async()=>{
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                await signInWithEmailAndPassword(auth, email,password);
                window.location.href = "dashboard.html";
            } catch (error) {
                alert('error.message')
            }
        })
    }

    if(signupBtn){
        signupBtn.addEventListener('click', async()=>{
            console.log("signup button clicked")
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const role = document.getElementById('role').value;
            try {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
                const id = userCredentials.user.uid;
                await setDoc(doc(db,"user",id),{email,role});
                window.location.href = 'login.html';
            } catch (error) {
                alert('error.message')
            }
        })
    }

    if(logoutBtn){
        logoutBtn.addEventListener('click', async()=>{
            await signOut(auth);
            window.location.href = 'login.html';
        })
    }

})