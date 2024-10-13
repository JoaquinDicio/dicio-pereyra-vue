<script>
import Aside from '../components/Aside.vue';
import PostForm from '../components/PostForm.vue';
import ListPosts from '../components/ListPosts.vue';
import { addFirebaseDoc } from '../utils/addFirebaseDoc';
import { suscribeToAuth } from '../services/auth';
import { getFirebaseCollection } from '../utils/getFirebaseCollection.js';
import SectionHeader from '../components/SectionHeader.vue';

export default {
  name: "Home",
  data() {
    return {
      loading: false,
      posts: [],
      user: {},
    }
  },
  components: { Aside, PostForm, ListPosts, SectionHeader },
  methods: {
    async handleNewPost(text) {

      const { username, id, img } = this.user
      const post = { text, userImg: img, username, userId: id }
      await addFirebaseDoc('posts', post)

    }
  },
  mounted() {
    this.loading = true;

    getFirebaseCollection((posts) => this.posts = posts, 'posts')

    suscribeToAuth((userCredentials) => {
      this.user = { ...userCredentials }
    })

    this.loading = false;
  }
};
</script>

<template>
  <section class="bg-[var(--bg-color)]">
    <div class="flex min-h-screen flex-1 mx-auto max-w-[1200px]">
      <Aside class="border-r-slate-800"></Aside>
      <main class="md:w-3/4 w-full max-h-screen overflow-y-scroll text-white border-r-slate-800 border-r-2">
        <SectionHeader :sectionName="'Home'" />
        <div>
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
