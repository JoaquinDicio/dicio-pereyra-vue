import { db } from "../services/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
  where,
  updateDoc,
  arrayUnion,
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
        return { text, userId, username, img, id: doc.id, comments: []};
      })
    );
    console.log(queryResults)
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

export async function getPostById(postId) {
  try {
    const postDocRef = doc(db, "posts", postId);
    const postDoc = await getDoc(postDocRef);

    if (postDoc.exists()) {
      const { text, userId, comments } = postDoc.data(); // Incluye comments aquí
      const { username, img } = await getUserById(userId);

      return { text, userId, username, img, id: postDoc.id, comments: comments || [] };
    } else {
      throw new Error("No se encontró el post con el ID especificado.");
    }
  } catch (error) {
    console.error("Error obteniendo el post:", error.message);
    return null; // Retornar null en caso de error
  }
}

export async function addCommentToPost(postId, comment) {
  try {
    const postDocRef = doc(db, "posts", postId);
    
    await updateDoc(postDocRef, {
      comments: arrayUnion(comment)
    });

    console.log("Comentario agregado exitosamente.");
  } catch (error) {
    console.error("Error al agregar comentario:", error.message);
  }
}
