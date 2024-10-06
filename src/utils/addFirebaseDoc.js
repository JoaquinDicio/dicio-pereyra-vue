import { db } from "../services/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function addFirebaseDoc(collectionName, doc) {
  try {
    const collectionRef = collection(db, collectionName);
    doc.createdAt = Timestamp.now();
    //lo pongo aca para que todos los docs creados tengan un timestamp
    await addDoc(collectionRef, doc);
  } catch (e) {
    console.error("Error agregando el documento: ", e);
  }
}
