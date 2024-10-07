import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Asegúrate de importar db también

const userCredentials = {
  id: null,
  email: null,
};

let callbacks = [];

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userCredentials.id = user.uid;
    userCredentials.email = user.email;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      userCredentials.username = userDoc.data().username; 
    } else {
      console.log("No hay datos del usuario en Firestore");
    }
  } else {
    userCredentials.id = null;
    userCredentials.email = null;
    userCredentials.username = null; 
  }

  notifyAll();
});

export async function login({ email, password }) {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log("password o email invalidos");
  }
}

export async function logout() {
  return signOut(auth);
}

export function suscribeToAuth(callback) {
  callbacks.push(callback);
  notify(callback);
}

function notify(callback) {
  callback({ ...userCredentials });
}

function notifyAll() {
  callbacks.forEach((callback) => notify(callback));
}
