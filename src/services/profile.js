import { updateProfile, updateEmail } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import router from "../router";

export async function getUserProfile(userId, callback) {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      // busca los posts del usuario
      const postsRef = collection(db, "posts");
      const postsQuery = query(postsRef, where("userId", "==", userId));
      const postsSnap = await getDocs(postsQuery);
      const userPosts = [];

      postsSnap.forEach((doc) => {
        userPosts.push({ id: doc.id, ...doc.data() });
      });

      callback({ user: { ...userData }, posts: userPosts });
    } else {
      throw { msg: "Usuario no encontrado" };
    }
  } catch (e) {
    console.log("Error obteniendo el perfil", e);
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
