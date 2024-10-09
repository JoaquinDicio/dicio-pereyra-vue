import { db } from "../services/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
  where,
} from "firebase/firestore";

export async function getPosts(callback, filter) {
  const postsCollection = collection(db, "posts");
  let postsCollQuery = query(postsCollection, orderBy("createdAt", "desc"));

  if (filter) {
    //si hay filtro suma la condicion a la query anterior
    const { field, operator, value } = filter;
    postsCollQuery = query(postsCollQuery, where(field, operator, value));
  }

  onSnapshot(postsCollQuery, async (snapshot) => {
    const queryResults = await Promise.all(
      // hay q usar promise all porque sino devuelve un array solo de promesas
      snapshot.docs.map(async (doc) => {
        const { text, userId } = doc.data();
        const { username, img } = await getUserById(userId);
        return { text, userId, username, img };
      })
    );

    callback(queryResults);
  });
}

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
