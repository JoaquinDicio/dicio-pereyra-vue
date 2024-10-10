<script>
import Aside from '../components/Aside.vue';
import { logout } from '../services/auth';

export default {
    name: "Home",
    data() {
        return {
            loading: false,
            post: null,
            user: {},
            commentText: '',
        };
    },
    components: { Aside },
    methods: {
        handleLogout() {
            logout();
        },
        async submitComment(commentText) {
        }
    },
    mounted() {
        const { postId } = this.$route.params

        getPostById(postId)
    }
};
</script>

<template>
    <section class="bg-[var(--bg-color)]">
        <div class="flex min-h-screen flex-1 mx-auto max-w-[1200px]">
            <Aside class="px-10 py-5 border-r-slate-800"></Aside>
            <main class="w-3/4 max-h-screen overflow-y-scroll text-white border-r-slate-800 border-r-2">
                <div>
                    <div class="border-b-2 border-slate-800 p-5 flex items-center justify-between">
                        <h2 class="text-xl font-medium">Post</h2>
                        <button v-if="user.id" @click="handleLogout"
                            class="text-sm font-medium text-white bg-red-600 py-3 px-5 rounded">Cerrar sesión</button>
                    </div>

                    <div v-if="loading" class="p-5">
                        <p>Cargando post...</p>
                    </div>

                    <form @submit.prevent="submitComment(commentText)">
                        <textarea v-model="commentText" name="text" id="text" rows="3"
                            class="p-5 bg-transparent w-full resize-none"
                            placeholder="¡Escribe un comentario!"></textarea>
                        <div class="pb-2 flex items-center">
                            <input type="submit"
                                class="hover:bg-indigo-800 cursor-pointer transition w-full px-4 py-2 bg-indigo-900"
                                value="Publicar">
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </section>
</template>
