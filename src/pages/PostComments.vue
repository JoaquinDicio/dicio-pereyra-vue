<script>
import Aside from '../components/Aside.vue';
import { auth } from '../services/firebase.js';
import { logout, suscribeToAuth } from '../services/auth';
import { getPostById, addCommentToPost } from '../utils/getPosts.js';
import CommentsList from '../components/CommentsList.vue'
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
    components: { Aside, CommentsList },
    methods: {
        handleLogout() {
            logout();
        },
        async getPost() {
            const postId = this.$route.params.postid;
            this.loading = true;
            try {
                this.post = await getPostById(postId);
            } catch (error) {
                console.error("Error al obtener el post:", error.message);
            } finally {
                this.loading = false;
            }
        },
        async submitComment(commentText) {
            const postId = this.$route.params.postid;

            const newComment = {
                text: commentText,
                userId: auth.currentUser.uid,
                createdAt: new Date(),
            };

            await addCommentToPost(postId, newComment);
            this.commentText = '';
        }
    },
    mounted() {
        suscribeToAuth((userCredentials) => {
            this.user = { ...userCredentials, ...this.user };
        });
        this.getPost();
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

                    <div v-if="!loading && post" class="p-5">
                        <div class="w-full border-b-2 px-5 p-7 border-slate-800 flex gap-3">
                            <img :src="post.img" :alt="post.username" class="rounded-full w-[45px] h-[45px]">
                            <div>
                                <router-link :to="`/profile/${post.userId}`" class="font-medium">{{ post.username
                                    }}</router-link>
                                <p>{{ post.text }}</p>
                            </div>
                        </div>

                        <form @submit.prevent="submitComment(commentText)">
                            <textarea v-model="commentText" name="text" id="text" rows="3"
                                class="p-5 bg-transparent w-full" placeholder="¡Escribe un comentario!"></textarea>
                            <div class="pb-2 flex items-center">
                                <input type="submit"
                                    class="hover:bg-indigo-800 cursor-pointer transition w-full px-4 py-2 bg-indigo-900"
                                    value="Publicar">
                            </div>
                        </form>

                        <CommentsList :comments="post.comments" />
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>
