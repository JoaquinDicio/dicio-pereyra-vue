<script>
import Register from './pages/Register.vue';
import Login from './pages/Login.vue';
import PrimaryLink from './components/Link.vue';
import SecondaryLink from './components/SecondaryLink.vue';
import Link from './components/Link.vue';

export default {
  name:"App",
  components:{Register,Login, Link}
}
</script>

<template>
<header class="fixed bg-[#11212d] text-white  t-0 py-4 px-14 w-full class items-center flex justify-between">
  <router-link :to="{name:'welcome'}">
    <h1 class="font-bold text-2xl">NotTwitter</h1>
  </router-link>
  <nav class="flex gap-3">
    <Link :route="'login'" :type="'primary'">Iniciar sesion</Link>
    <Link :route="'register'" :type="'secondary'">Registrarse</Link>
  </nav>
</header>
<main class="text-white bg-[#11212d] pt-20">
  <router-view/>
</main>
<footer class="bg-[#06141B] text-white p-4 flex justify-center">
  <p>NotTwitter 2024 - Todos los derechos reservados</p>
</footer>
</template>

