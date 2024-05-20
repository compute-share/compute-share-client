// lib/firestore.js
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

export async function addUserData(uid, data) {
    try {
        const docRef = await addDoc(collection(db, 'users'), {
        uid,
        ...data,
        });
        return docRef.id;
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

export async function getUserData(uid) {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);
    const userData = querySnapshot.docs.map((doc) => doc.data());
    return userData[0];
}
