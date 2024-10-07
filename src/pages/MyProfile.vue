<script>
import { suscribeToAuth } from '../services/auth.js'
import Aside from '../components/Aside.vue';
import { logout } from '../services/auth';

export default {
    name: "myprofile",
    components: {
        Aside
    },
    data() {
        return {
            loading: false,
            user: { email: '', username: '', img: 'https://picsum.photos/200/200', biography: ''},
        };
    },
    methods : {
        handleLogout() {
            logout()
            this.$router.push({ name: 'login' });
        }
    },
    mounted() {
        this.loading = true;

        suscribeToAuth((userCredentials) => {
            this.user.email = userCredentials.email;
            this.user.id = userCredentials.id;
            this.user.username = userCredentials.username;
            this.user.biography = userCredentials.biography || 'No hay una biografía!';
        })

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
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>