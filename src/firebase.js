// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    } from "firebase/auth";
import {
    addDoc, 
    collection, 
    getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflix-clone-react-7d82e.firebaseapp.com",
  projectId: "netflix-clone-react-7d82e",
  storageBucket: "netflix-clone-react-7d82e.firebasestorage.app",
  messagingSenderId: "555859897100",
  appId: "1:555859897100:web:7221df582380a7703cf729"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await updateProfile(user, {displayName: name})

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {

        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }

}
const logout = async () => {

    try {
        await signOut(auth);
        toast.info("Logged out successfully! 👋");

    } catch (error) {
        console.log(error);
        toast.error("Failed to log out.");
    }
}

export {auth, db, login, signup, logout};