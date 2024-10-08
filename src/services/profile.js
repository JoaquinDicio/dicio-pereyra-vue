import { updateProfile, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function editProfile({ username, email, biography }) {
  try {
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    await updateEmail(auth.currentUser, email);

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      username: username,
      email: email,
      biography: biography,
    });

    this.$router.push({ name: "myprofile" });
  } catch (error) {
    console.log(`[Profile.js editProfile] Error al editar el perfil: ${error}`);

    if (error.code === "auth/requires-recent-login") {
      console.log(
        "El usuario necesita re-autenticarse para realizar esta operación."
      );
    }
  }
}
