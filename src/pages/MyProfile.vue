<script>
import { suscribeToAuth } from '../services/auth.js'
import Aside from '../components/Aside.vue';
import { logout } from '../services/auth';
import { getFirebaseCollection } from '../utils/getFirebaseCollection.js';
import ListPosts from '../components/ListPosts.vue';

export default {
    name: "MyProfile",
    components: {
        Aside,
        ListPosts
    },
    data() {
        return {
            loading: false,
            user: { img: 'https://picsum.photos/200/200' },
            posts: []
        };
    },
    methods: {
        handleLogout() {
            logout()
        }
    },
    mounted() {
        this.loading = true;

        suscribeToAuth((userCredentials) => {
            if (!userCredentials.biography) userCredentials.biography = 'No hay una biografia';
            this.user = { ...userCredentials, ...this.user }
        })

        const filter = { field: 'userId', operator: '==', value: this.user.id }
        getFirebaseCollection((posts) => {
            this.posts = posts
        }, 'posts', filter)

        this.loading = false;
    },

};
</script>

<template>
    <section class="bg-[var(--bg-color)]">
        <div class="flex min-h-screen flex-1 mx-auto max-w-[1200px]">

            <Aside :username="user.username" :email="user.email" class="px-10 py-5 border-r-slate-800"></Aside>

            <main class="w-3/4 max-h-screen overflow-y-scroll text-white border-r-slate-800 border-r-2">
                <div>
                    <div class="border-b-2 border-slate-800 p-5 flex items-center justify-between">
                        <h2 class="text-xl font-medium">Mi perfil</h2>
                        <button v-if="user.id" @click="handleLogout"
                            class="text-sm font-medium text-white bg-red-600 py-3 px-5 rounded ">Cerrar sesión</button>
                    </div>
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
                                    <router-link to="profile-edit">Editar</router-link>
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