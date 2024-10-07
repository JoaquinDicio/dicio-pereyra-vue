<script>
import Aside from '../components/Aside.vue';
import PostForm from '../components/PostForm.vue';
import ListPosts from '../components/ListPosts.vue';
import { addFirebaseDoc } from '../utils/addFirebaseDoc';
import { getFirebaseCollection } from '../utils/getFirebaseCollection';
import { logout, suscribeToAuth } from '../services/auth';

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      posts: [],
      user: { email: '', username: '', img: 'https://picsum.photos/200/200' },
    }
  },
  components: { Aside, PostForm, ListPosts },
  methods: {
    async handleNewPost(text) {
      const post = {
        ...this.user, text,
      };
      await addFirebaseDoc('posts', post)
    },
    handleLogout() {
      logout()
      this.$router.push({ name: 'login' });
    }
  },
  mounted() {
    this.loading = true;

    getFirebaseCollection((posts) => {
      this.posts = posts;
      this.loading = false
    }, 'posts')

    suscribeToAuth((userCredentials) => {
      this.user.email = userCredentials.email;
      this.user.id = userCredentials.id;
      this.user.username = userCredentials.username;

      console.log("Usuario autenticado:", this.user);
    })
  }
};
</script>

<template>
  <section class="bg-[var(--bg-color)]">
    <div class="flex min-h-screen flex-1 mx-auto max-w-[1200px]">

      <Aside :username="user.username" :email="user.email" class="px-10 py-5 border-r-slate-800"></Aside>

      <main class="w-3/4 max-h-screen overflow-y-scroll text-white border-r-slate-800 border-r-2">
        <div>
          <div class="border-b-2 border-slate-800 p-5 flex items-center justify-between">
            <h2 class="text-xl font-medium">Home</h2>
            <button v-if="user.id" @click="handleLogout"
              class="text-sm font-medium text-white bg-red-600 py-3 px-5 rounded ">Cerrar sesión</button>
          </div>
          <div class="p-5">
            <p class="text-lg">Bienvenido, <strong>{{ user.username }}</strong></p>
          </div>

          <PostForm @post-submit="handleNewPost" />

          <div>
            <div v-if="loading" class="flex h-full items-center justify-center">
              <p>Cargando los últimos posts...</p>
            </div>
            <ListPosts :posts="posts" />
          </div>
        </div>
      </main>

    </div>
  </section>
</template>
