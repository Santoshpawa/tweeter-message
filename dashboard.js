import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    addDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', ()=>{
    const input = document.getElementById('message-input');
    const container = document.getElementById('message-container');
    const inputBtn = document.getElementById('addmessage-btn');

    let currentUser = null;
    let role = null;
    onAuthStateChanged(auth, async(user)=>{
        if(user){
            currentUser = user;
            document.getElementById('user-email').innerText = user.email;
            const userDoc = await getDoc(doc(db,'user',user.uid));
            if(userDoc.exists()){
                let role = userDoc.data().role;
                document.getElementById('user-role').innerText = role;
                loadMessages(user,role);
            }
            
            
        }else{
            
            window.location.href = 'login.html'
        }
        
    })

    //loading messages

    async function loadMessages(user, role){
        container.innerHTML = "";
        const messageRef = collection(db,"messages");
        const messages = await getDocs(messageRef);

        messages.forEach((message)=>{
            const text = message.data();
            displayMessage(message.id, text, user.uid,role);
        })
        
    }

    // displaying messages

    function displayMessage(id, text, userId,role){    //  here id is message id...
        const div = document.createElement('div');
        div.classList.add('message');
        let p = document.createElement('p');
        let h5 = document.createElement('h5');
        p.innerText = text.content;
        h5.innerText = text.userEmail;
        div.append(p,h5);

        // admin and user extra responsibility
        if(text.userId == userId || role=='admin'){
            const edit = document.createElement('button');
            edit.innerText = "✏ Edit";
            edit.addEventListener('click',()=>{
                const editMessageArea = document.createElement('textarea');
                editMessageArea.innerText = text.content;
                p.replaceWith(editMessageArea);
                const save = document.createElement('button');
                save.innerText = "💾 Save";
                edit.replaceWith(save);
                save.addEventListener('click', async()=>{
                    let editMessage = editMessageArea.value;
                    await setDoc(doc(db,'messages',id),{
                        content : editMessage,
                        userId : userId,
                        userEmail : text.userEmail,
                        createdAt : new Date()

                    })
                    p.innerText = editMessage;
                    editMessageArea.replaceWith(p);
                    save.replaceWith(edit);
                })
            })

            //delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = "🗑 Delete";
            deleteBtn.addEventListener('click', async()=>{
                await deleteDoc(doc(db,'messages',id));
                div.remove();
            })
            div.append(edit,deleteBtn);
        }
        
        container.append(div);
    }

    // adding messages

    inputBtn.addEventListener('click', async()=>{
        const content = input.value.trim();
        if(content ==""){
            return;
        }
        await addDoc(collection(db,"messages"),{
            content,
            userId : currentUser.uid,
            userEmail: currentUser.email,
            createdAt : new Date()
        })
        input.value = "";
        loadMessages(currentUser, role);   
    })

})