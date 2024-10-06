<script>
import Aside from '../components/Aside.vue';
import PostForm from '../components/PostForm.vue';
import ListPosts from '../components/ListPosts.vue';
import addFirebaseDoc from '../utilities/addFirebaseDoc';


export default {
  name: "Home",
  //TODO = > ESTA DATA DEBERIA RECUPERARSE DE FIREBASE PERO FALTA USER COLLECTION
  data() {
    return {
      user: { nickname: 'theinoperant01', username: 'joacodicio', img: 'https://picsum.photos/200/200' },
    }
  },
  components: { Aside, PostForm, ListPosts },
  methods: {

    async handleSubmit(text) {
      const post = { ...this.user, text }
      await addFirebaseDoc('posts', post)
    },
  }
};
</script>

<template>
  <section class="bg-[var(--bg-color)]">
    <div class="flex min-h-screen flex-1 mx-auto max-w-[1200px]">
      <Aside class="px-10 py-5  border-r-slate-800"></Aside>
      <main class="w-3/4 max-h-screen overflow-y-scroll text-white border-r-slate-800 border-r-2">
        <div>
          <div class="border-b-2 border-slate-800 p-5">
            <h2 class="text-xl font-medium">Home</h2>
          </div>
          <PostForm @post-submit="handleSubmit" />
          <div>
            <ListPosts />
          </div>
        </div>
      </main>
    </div>
  </section>
</template>