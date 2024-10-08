<script>
import { registerUser } from "../services/auth.js";

export default {
  name: "Register",
  data() {
    return {
      credentials: {
        loading: false,
        email: '',
        password: '',
        username: '',
      },
      errors: {},
    };
  },
  methods: {
    async handleSubmit() {
      let { email, password, username } = this.credentials;

      try {
        if (!username) throw ({ username: 'El nombre de usuario es obligatorio' })
        await registerUser(email, password, username);
        this.$router.push({ name: 'login' });
      } catch (errorMessages) {
        this.errors = { ...errorMessages }
        console.log(this.errors)
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
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="username" class="block mb-2">Nombre de usuario</label>
            <input type="username" id="username" class="w-full border rounded p-2 text-gray-950"
              v-model="credentials.username">
            <p v-if="errors.username" class="text-red-500 mt-2">{{ errors.username }}</p>
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input type="email" id="email" class="w-full border rounded p-2 text-gray-950" v-model="credentials.email">
            <p v-if="errors.email" class="text-red-500 mt-2">{{ errors.email }}</p>
          </div>
          <div class="mb-4">
            <label for="password" class="block mb-2">Contraseña</label>
            <input type="password" id="password" class="w-full border rounded p-2 text-gray-950"
              v-model="credentials.password">
            <p v-if="errors.password" class="text-red-500 mt-2">{{ errors.password }}</p>
          </div>
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
