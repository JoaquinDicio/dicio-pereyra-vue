import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const userCredentials = {
  id: null,
  email: null,
};

let callbacks = [];

onAuthStateChanged(auth, (user) => {
  if (user) {
    userCredentials.id = user.uid;
    userCredentials.email = user.email;
  } else {
    userCredentials.id = null;
    userCredentials.email = null;
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
