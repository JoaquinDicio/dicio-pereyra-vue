import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export async function getFirebaseDoc(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      return docData;
    } else {
      throw { msg: "Documento no encontrado" };
    }
  } catch (error) {
    console.log("Error obteniendo el documento:", error.msg);
  }
}
