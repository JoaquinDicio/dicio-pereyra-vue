<script>
import { auth, db } from "../services/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default {
  name: "Register",
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        username: '', // Agregar el campo de nombre de usuario
        emailError: '',
        passwordError: '',
        usernameError: '', // Agregar error para el nombre de usuario
        createdUser: ''
      },
    };
  },
  watch: {
    'credentials.email'(value) {
      if (this.credentials.emailError && value) {
        this.credentials.emailError = '';
      }
    },
    'credentials.password'(value) {
      if (this.credentials.passwordError && value.length >= 6) {
        this.credentials.passwordError = '';
      } else if (!value.length) {
        this.credentials.passwordError = 'Por favor ingrese una contraseña';
      }
    },
    'credentials.username'(value) {
      if (this.credentials.usernameError && value) {
        this.credentials.usernameError = '';
      }
    }
  },

  methods: {
    async createUser() {
      if (!this.credentials.username) {
        this.credentials.usernameError = 'El nombre de usuario es obligatorio';
        return;
      } else {
        this.credentials.usernameError = '';
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.credentials.email, this.credentials.password);

        const userId = userCredential.user.uid;

        await setDoc(doc(db, "users", userId), {
          username: this.credentials.username,
          email: this.credentials.email
        });

        this.credentials.createdUser = 'Usuario creado correctamente';
        console.log('Usuario creado correctamente');
      } catch (error) {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          this.credentials.emailError = 'El correo ya está en uso';
        } else if (errorCode === 'auth/invalid-email') {
          this.credentials.emailError = 'El correo electrónico no es válido';
        } else if (errorCode === 'auth/weak-password') {
          this.credentials.passwordError = 'La contraseña debe tener al menos 6 caracteres';
        } else if (errorCode === 'auth/missing-password') {
          this.credentials.passwordError = 'Por favor ingrese una contraseña';
        } else {
          this.credentials.emailError = 'Error al crear el usuario: ' + error.message;
        }
      }
    }
  }
};
</script>


<template>
  <main class="text-white bg-[#11212d] pt-18">
    <div class="flex min-h-screen flex-col justify-center px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Crea un usuario
        </h2>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="createUser">
          <div class="mb-4">
            <label for="username" class="block mb-2">Nombre de usuario</label>
            <input type="username" id="username" class="w-full border rounded p-2 text-gray-950"
              v-model="credentials.username">
            <p v-if="credentials.usernameError" class="text-red-500 mt-2">{{ credentials.usernameError }}</p>
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input type="email" id="email" class="w-full border rounded p-2 text-gray-950" v-model="credentials.email">
            <p v-if="credentials.emailError" class="text-red-500 mt-2">{{ credentials.emailError }}</p>
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">Contraseña</label>
            <input type="password" id="password" class="w-full border rounded p-2 text-gray-950"
              v-model="credentials.password">
            <p v-if="credentials.passwordError" class="text-red-500 mt-2">{{ credentials.passwordError }}</p>
          </div>
          <p v-if="this.credentials.createdUser" class="text-green-500 my-2">{{ this.credentials.createdUser }}</p>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Registrarse</button>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
          Ya tienes una cuenta?
          <router-link :to="{ name: 'login' }" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Inicia sesión
          </router-link>
        </p>
      </div>
    </div>
  </main>
</template>
