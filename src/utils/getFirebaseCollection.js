import { db } from "../services/firebase";
import {
  orderBy,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";

export async function getFirebaseCollection(callback, collectionName, filter) {
  try {
    //construye la consulta normalmente
    const coll = collection(db, collectionName);
    let collQuery = query(coll, orderBy("createdAt", "desc"));

    if (filter) {
      //si hay filtro suma la condicion a la query anterior
      const { field, operator, value } = filter;
      collQuery = query(collQuery, where(field, operator, value));
    }
    //CURIOSIDAD -> para que esto funcione firebase te va a pedir crear un indice de 'consulta compuesta'

    onSnapshot(collQuery, (snapshot) => {
      const queryResults = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(queryResults);
    });
  } catch (e) {
    console.log("Error conectando con la base de datos:", e);
  }
}
