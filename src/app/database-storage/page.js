"use client";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";


export default function Home() {
    const collectionRef = collection(db, 'users');
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const addNewPerson = async (event) => {
        event.preventDefault();
        await addDoc(collectionRef, {
            userName: userName,
            userEmail: userEmail
        });

        
    }
    
    return (
    <div>
        <form>
        <input type="text" placeholder="Name" onKeyUp={(event) => setUserName(event.target.value)}></input>
        <input type="email" placeholder="Email" onKeyUp={(event) => setUserEmail(event.target.value)}></input>
        <button type="submit" onClick={(event) => addNewPerson(event)}>Submit</button>
        </form> 
    </div>
    );
}
