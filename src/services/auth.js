import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

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
    console.log("Credenciales invalidas");
  }
}
export async function registerUser(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    await setDoc(doc(db, "users", userId), {
      username: username,
      email: email,
    });

    return userCredential.user;
  } catch (error) {
    console.log("No se ha podido registrar un nuevo usuario");
    throw error;
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
