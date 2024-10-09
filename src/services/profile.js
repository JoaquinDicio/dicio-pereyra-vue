import { updateProfile, updateEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import router from "../router";

export async function getUserById(userId, callback) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    if (docSnap.exists()) {
      callback(userData);
    } else {
      throw { msg: "Usuario no encontrado" };
    }
  } catch (error) {
    console.log("Error obteniendo el usuario::", error.msg);
  }
}

export async function editProfile({ username, email, biography, img }) {
  try {
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    await updateEmail(auth.currentUser, email);

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      username,
      email,
      biography,
      img,
    });

    router.push(`profile/${auth.currentUser.uid}`);
  } catch (error) {
    console.log(error);

    if (error.code === "auth/requires-recent-login") {
      console.log(
        "El usuario necesita re-autenticarse para realizar esta operación."
      );
    }
  }
}
