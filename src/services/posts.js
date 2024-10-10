import { db } from "./firebase";
import { getFirebaseDoc } from "../utils/getFirebaseDoc";
import { getFirebaseCollection } from "../utils/getFirebaseCollection";

export async function getPostWithComments(postId, callback) {
  const postData = await getFirebaseDoc("posts", postId);
  //trae los comentarios del post
  const filter = { field: "postId", operator: "==", value: postId };
  //esta parte envia dentro del callback de 'getFirebaseCollection' el callback asignado
  // no se si es lo mejor, pero no se me ocurrio otra forma
  await getFirebaseCollection(
    (commentsColl) => {
      const comments = [];
      commentsColl.forEach((comment) => comments.push(comment));
      //conforma el post completo y ejecuta elcallback
      callback({ ...postData, comments: comments });
    },
    "comments",
    filter
  );
}
