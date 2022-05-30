import React from "react";
import {
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { db } from "./Firebase/firebase-config";
const App = () => {
    const person = {
        name: "MAju",
        contact: 923213123,
    };

    const addUser = async () => {
        const userRef = collection(db, "users");

        try {
            const docRef = await addDoc(userRef, person);

            console.log(docRef.data());
        } catch (err) {
            console.log(err);
        }
    };

    const addUserCustomID = async () => {
        const userRef = collection(db, "users");
        const docRef = await setDoc(doc(userRef, "id-1"), person);
        console.log(docRef.id);
    };

    const getData = async () => {
        const docRef = doc(db, "users", "id-3");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    };

    const getAllUSers = async () => {
        const userRef = collection(db, "users");

        const querySnapshot = await getDocs(userRef);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    };

    return (
        <div>
            <button onClick={addUser}>add User</button>
            <button onClick={addUserCustomID}>add User custom Id</button>
            <button onClick={getData}>Get User</button>
            <button onClick={getAllUSers}>get All Users</button>
        </div>
    );
};

export default App;
