<script>
import Link from "../components/Link.vue";

export default {
  name: "Home",
  components: { Link },
};
</script>

<template>
  <main class="text-white bg-[#11212d] pt-20">
    <section class="min-h-screen flex items-center p-20">
      <div class="mb-52">
        <h2 class="text-3xl max-w-[320px]">
          Bienvenid@ a
          <span class="text-6xl font-bold">NotTwitter</span>
        </h2>
        <p class="pt-4 text-slate-100">
          Enterate ahora sobre lo que está pasando en todo el mundo
        </p>
        <nav class="mt-8 flex items-center gap-3">
          <Link :route="'login'" :type="'primary'">Iniciar sesion</Link>
          <Link :route="'register'" :type="'secondary'">Registrarse</Link>
        </nav>
      </div>
    </section>
  </main>
</template>
