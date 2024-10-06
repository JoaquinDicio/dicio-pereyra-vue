<script>
import Aside from '../components/Aside.vue';
import Post from '../components/Post.vue';

export default {
  name: "Home",
  mounted() {
    console.log("componente montado");
  },
  components: { Aside, Post }
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
          <form>
            <textarea name="text" id="text" rows="3" class="p-2 bg-transparent w-full"
              placeholder="¡¿Qué está pasando?!"></textarea>
            <div class="pb-2 flex items-center">
              <input type="submit"
                class=" hover:bg-indigo-800 cursor-pointer transition  w-full px-4 py-2 bg-indigo-900" value="Publicar">
            </div>
          </form>
          <div>
            <ul>
              <li>
                <Post :img="'https://picsum.photos/200/200'" :username="'joacodicio'"
                  :text="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae facere tempore soluta labore voluptas veniam eius in ipsa? Asperiores, quam?'" />
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>