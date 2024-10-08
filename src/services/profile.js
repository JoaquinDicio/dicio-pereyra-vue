import { updateProfile, updateEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import router from "../router";

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

    router.push({ name: "MyProfile" });
  } catch (error) {
    console.log(error);

    if (error.code === "auth/requires-recent-login") {
      console.log(
        "El usuario necesita re-autenticarse para realizar esta operación."
      );
    }
  }
}
