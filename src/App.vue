<script>

export default {
  name: "App",
  data() {
    return {
      authenticatedUser: { id: null, email: null }
    }
  },
};
</script>
<template>
  <router-view />
  <footer class="bg-[#06141B] text-white p-4 flex justify-center">
    <p>NotTwitter 2024 - Todos los derechos reservados</p>
  </footer>
</template>
