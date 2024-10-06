import { collection, onSnapshot } from "firebase/firestore";

export default async function getFirebaseCollection(collectionName) {
  let results = [];
  const collectionRef = collection(db, collectionName);
  onSnapshot(collectionRef, (snapshot) => {
    results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  return results;
}
