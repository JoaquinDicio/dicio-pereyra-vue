import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { getDoc, doc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import router from "../router";

const userCredentials = {
  id: null,
  email: null,
};

let callbacks = [];

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDocRef = doc(db, "users", user.uid);

    onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        userCredentials.id = user.uid;
        userCredentials.email = user.email;
        userCredentials.username = docSnapshot.data().username; 
        userCredentials.biography = docSnapshot.data().biography;
      } else {
        console.log("No hay datos del usuario en Firestore");
      }

      notifyAll();
    });
  } else {
    userCredentials.id = null;
    userCredentials.email = null;
    userCredentials.username = null;
    userCredentials.biography = null;

    notifyAll();
  }
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

export async function editProfile({ username, email, biography  }) {
  try {
    await updateProfile(auth.currentUser, {
      displayName: username,
    });

    await updateEmail(auth.currentUser, email);

    await sendEmailVerification(auth.currentUser);

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      username: username,
      email: email,
      biography: biography
    });

    router.push({ name: 'myprofile' });
    console.log('Perfil editado con éxito. Verifica tu nuevo correo electrónico.');
  } catch (error) {
    console.log(`[Auth.js editProfile] Error al editar el perfil: ${error}`);
    
    if (error.code === 'auth/requires-recent-login') {
      console.log('El usuario necesita re-autenticarse para realizar esta operación.');
    }
  }
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
