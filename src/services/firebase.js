import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH_CUXgAXlxbMuzIcnKp7gc4c7zwwcqag",
  authDomain: "not-twitter-3cd5a.firebaseapp.com",
  projectId: "not-twitter-3cd5a",
  storageBucket: "not-twitter-3cd5a.appspot.com",
  messagingSenderId: "147270852338",
  appId: "1:147270852338:web:c7c99620237b4027c4ba6b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

async function addPost(post) {
  try {
    const postsCollectionRef = collection(db, "posts");
    await addDoc(postsCollectionRef, post);
  } catch (e) {
    console.error("Error agregando el documento: ", e);
  }
}
