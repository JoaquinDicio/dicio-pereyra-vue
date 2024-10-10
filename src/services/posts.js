import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export async function getUserById(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    if (docSnap.exists()) {
      return userData;
    } else {
      throw { msg: "Usuario no encontrado" };
    }
  } catch (error) {
    console.log("Error obteniendo el usuario::", error);
  }
}
