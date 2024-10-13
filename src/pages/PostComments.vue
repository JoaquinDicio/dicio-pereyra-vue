<script>
import Aside from '../components/Aside.vue';
import CommentsList from '../components/CommentsList.vue';
import SectionHeader from '../components/SectionHeader.vue';
import { suscribeToAuth } from '../services/auth.js';
import { getPostWithComments } from '../services/posts.js';
import { addFirebaseDoc } from '../utils/addFirebaseDoc.js';

export default {
    name: "PostComments",
    components: { Aside, SectionHeader, CommentsList },
    data() {
        return {
            loading: false,
            post: { comments: [] },
            user: {},
            commentText: '',
        };
    },
    methods: {
        async submitComment(commentText) {
            const { username, id, img } = this.user
            const { postId } = this.$route.params
            const comment = { text: commentText, userId: id, userImg: img, username, postId }
            await addFirebaseDoc('comments', comment)
            this.commentText = ''
        }
    },
    mounted() {
        //carga los comentarios del post
        const { postId } = this.$route.params
        this.loading = true;
        try {
            getPostWithComments(postId, (postData) => {
                this.post = { ...postData }
                this.loading = false
            })
        } catch (e) {
            console.log('Error cargando el post:', e)
        }

        //saca los datos del user autenticado (el que va a subir el comment)
        suscribeToAuth((userCredentials) => {
            const { username, img, id } = userCredentials
            this.user = { username, img, id }
        })


    }
};
</script>

<template>
    <section class="bg-[var(--bg-color)]">
        <div class="flex min-h-screen flex-1 mx-auto max-w-[1200px]">
            <Aside class="md:px-10 py-5 border-r-slate-800"></Aside>
            <main class="md:w-3/4 max-h-screen overflow-y-scroll text-white border-r-slate-800 border-r-2">
                <div>
                    <SectionHeader :sectionName="'Comentarios'" />

                    <div v-if="loading" class="p-5">
                        <p>Cargando post...</p>
                    </div>

                    <div v-else>
                        <!-- Información del post -->
                        <div class="w-full border-b-2 px-5 p-7 border-slate-800 flex gap-3">
                            <img :src="post.userImg" :alt="post.username" class="rounded-full w-[45px] h-[45px]">
                            <div>
                                <router-link :to="`/profile/${post.userId}`" class="font-medium">{{ post.username
                                    }}</router-link>
                                <p>{{ post.text }}</p>
                            </div>
                        </div>

                        <!-- Formulario para añadir comentario -->
                        <form @submit.prevent="submitComment(commentText)" class="mb-5">
                            <textarea v-model="commentText" name="text" id="text" rows="3"
                                class="p-5 bg-transparent w-full resize-none"
                                placeholder="¡Escribe un comentario!"></textarea>
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
