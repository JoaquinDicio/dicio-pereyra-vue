import { db } from "../services/firebase";
import { orderBy, onSnapshot, collection, query } from "firebase/firestore";

export async function getFirebaseCollection(callback, collectionName) {
  const postsCollection = collection(db, collectionName);
  const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
  onSnapshot(postsQuery, (snapshot) => {
    const queryResults = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(queryResults);
  });
}
