<script>
import Aside from '../components/Aside.vue';
import ListPosts from '../components/ListPosts.vue';
import { getUserProfile } from '../services/profile.js';
import { auth } from '../services/firebase.js';
import SectionHeader from '../components/SectionHeader.vue';

export default {
    name: "MyProfile",
    components: {
        Aside,
        ListPosts,
        SectionHeader
    },

    data() {
        return {
            loading: false,
            isMyProfile: false,
            user: {},
            posts: [],
        };
    },
    mounted() {
        const { userId } = this.$route.params
        if (userId == auth.currentUser.uid) this.isMyProfile = true;

        try {
            this.loading = true;
            getUserProfile(userId, data => { this.user = data.user; this.posts = data.posts })
        } catch (e) {
            console.log('Error cargando el perfil del usuario:', e)
        } finally {
            this.loading = false;
        }
    },
};
</script>

<template>
    <section class="bg-[var(--bg-color)]">
        <div class="flex min-h-screen flex-1 mx-auto max-w-[1200px]">

            <Aside class="px-10 py-5 border-r-slate-800"></Aside>

            <main class="w-3/4 max-h-screen overflow-y-scroll text-white border-r-slate-800 border-r-2">
                <div>
                    <SectionHeader :sectionName="'Perfil'" />
                    <div class="flex flex-col items-start mb-8 px-10 py-10">
                        <div class=" rounded-md bg-red-300">
                            <img class="rounded-md w-full"
                                src="https://blogthinkbig.com/wp-content/uploads/sites/4/2018/07/V%C3%ADa-L%C3%A1ctea-portada-espacio-universo.jpg?fit=2296%2C818"
                                alt="img-profile">
                        </div>
                        <div class="w-full flex justify-between relative flex-col bottom-16 px-7">
                            <div><img :src="user.img" alt="Perfil de usuario" class="w-32 h-32 rounded-full mb-6"></div>
                            <div class="flex justify-between">
                                <div>
                                    <p class="text-2xl font-semibold">{{ user.username }}</p>
                                    <p class="text-lg">{{ user.email }}</p>
                                    <p class="text-sm">{{ user.biography }}</p>
                                </div>
                                <div>
                                    <router-link :to="{ name: 'profile-edit' }" v-if="isMyProfile">Editar</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="w-full">
                            <ListPosts :posts="posts" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>