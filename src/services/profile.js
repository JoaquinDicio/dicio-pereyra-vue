import { updateProfile, updateEmail } from "firebase/auth";
import {
  doc,
  updateDoc,
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

export async function editProfile(user) {
  try {
    // primero actualiza los datos en la coleccion de users
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      username: user.username,
      img: user.img,
      biography: user.biography,
      email: user.email,
    });

    // Actualiza los datos tambien en los comments
    const commentsRef = collection(db, "comments");
    const commentsQuery = query(commentsRef, where("userId", "==", user.id));
    const commentsSnapshot = await getDocs(commentsQuery);

    commentsSnapshot.forEach(async (docSnapshot) => {
      const commentRef = doc(db, "comments", docSnapshot.id);
      await updateDoc(commentRef, {
        username: user.username,
        img: user.img,
      });
    });

    //actualiza los datos tambien en los post
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, where("userId", "==", user.id));
    const postsSnapshot = await getDocs(postsQuery);

    postsSnapshot.forEach(async (docSnapshot) => {
      const postRef = doc(db, "posts", docSnapshot.id);
      await updateDoc(postRef, {
        username: user.username,
        img: user.img,
      });
    });

    router.push(`/profile/${user.id}`);
  } catch (error) {
    console.error("Error actualizando perfil: ", error);
  }
}
