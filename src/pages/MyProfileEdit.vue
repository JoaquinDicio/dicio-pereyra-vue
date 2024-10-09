<script>
import { suscribeToAuth } from '../services/auth.js'
import Aside from '../components/Aside.vue';
import { logout } from '../services/auth';
import { editProfile } from '../services/profile.js';

export default {
    name: "MyProfileEdit",
    components: {
        Aside
    },
    data() {
        return {
            editing: false,
            loading: false,
            user: {},
        };
    },
    methods: {
        handleLogout() {
            logout()
        },
        async handleSubmit() {
            if (this.editing) return;

            this.editing = true;

            try {
                const { username, email, biography, img } = this.user

                await editProfile({
                    username,
                    email,
                    biography,
                    img
                });

            } catch (error) {
                console.error(error);
            } finally {
                this.editing = false;
            }
        },

    }
    ,
    mounted() {
        this.loading = true;

        suscribeToAuth((userCredentials) => {
            if (!userCredentials.biography) userCredentials.biography = 'No hay biografia!'
            this.user = userCredentials
        })

        this.loading = false;
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
                        <h2 class="text-xl font-medium">Editar mi perfil</h2>
                        <button v-if="user.id" @click="handleLogout"
                            class="text-sm font-medium text-white bg-red-600 py-3 px-5 rounded ">Cerrar sesión</button>
                    </div>
                    <div v-if="!loading" class="flex flex-col items-start mb-8 px-10 py-10">
                        <form action="#" @submit.prevent="handleSubmit" class="flex flex-col">
                            <label for="Fotito" class=" my-3">Foto:</label>
                            <input type="text" class="text-slate-950 p-2 rounded-lg" v-model="user.img">
                            <label for="Nombre" class=" my-3">Nombre:</label>
                            <input type="text" class="text-slate-950 p-2 rounded-lg" v-model="user.username">
                            <label for="Email" class=" my-3">Email:</label>
                            <input type="text" class="text-slate-950 p-2 rounded-lg" v-model="user.email">
                            <label for="Biography" class=" my-3">Biografia:</label>
                            <textarea rows="6" cols="50" class="text-slate-950 p-2 rounded-lg"
                                v-model="user.biography"></textarea>
                            <button type="submit" class=" bg-green-500 py-2 rounded-lg mt-7">{{ editing ?
                                'Actualizando...' : 'Actualizar' }}</button>
                        </form>
                    </div>
                    <div v-else>
                        <i>Cargando...</i>
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>
