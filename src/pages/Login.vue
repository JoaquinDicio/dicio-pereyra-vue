<script>
import { login } from '../services/auth';

export default {
  name: "Login",
  data() {
    return {
      credentials: {},
      error: false
    };
  },
  methods: {
    async handleSubmit() {
      // TODO => validar para no hacer solicitudes al pedo estaria bueno
      try {
        const response = await login(this.credentials)
        if (response.user.uid) {
          this.$router.push({ name: 'home' });
        }
      } catch (e) {
        this.error = true
      }
    },
  },
};
</script>

<template>
  <main class="text-white bg-[#11212d] pt-18">
    <div class="flex min-h-screen flex-col justify-center px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Inicia Sesion
        </h2>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleSubmit" class="space-y-6" action="#" method="POST">
          <div class="mt-12">
            <label for="username" class="block text-sm font-medium leading-6">Email</label>
            <div class="mt-2">
              <input v-model="credentials.email" id="email" name="email" type="text" required
                class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6">Contraseña</label>
            </div>
            <div class="mt-2">
              <input v-model="credentials.password" id="password" name="password" type="password" required
                class="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <p v-if="error" class="text-red-500 text-sm mt-5">Credenciales no validas</p>
          </div>
          <div>
            <button type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Iniciar sesion
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
          No tenes una cuenta?
          <router-link :to="{ name: 'register' }"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Registrate</router-link>
        </p>
      </div>
    </div>
  </main>
</template>
