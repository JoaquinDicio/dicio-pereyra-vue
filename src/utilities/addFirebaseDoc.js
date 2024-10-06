import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function addFirebaseDoc(collectionName, doc) {
  try {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, doc);
  } catch (e) {
    console.error("Error agregando el documento: ", e);
  }
}
