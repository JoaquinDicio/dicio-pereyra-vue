<script>
import { suscribeToAuth } from '../services/auth.js'
import Aside from '../components/Aside.vue';
import { logout, editProfile } from '../services/auth';
import { auth } from "../services/firebase.js";
export default {
    name: "MyProfileEdit",
    components: {
        Aside
    },
    data() {
        return {
            editing: false,
            user: { email: '', username: '', img: 'https://picsum.photos/200/200' },
        };
    },
    methods : {
        handleLogout() {
            logout()
            this.$router.push({ name: 'login' });
        },
        async handleSubmit(){
            console.log(this.user)
            this.editing = true;

            try {
                await editProfile({ username: this.user.username });
                this.user.username = auth.currentUser.displayName;
            } catch (error) {
                console.log(`[MyProfileEdit handleSubmit] Error al editar el perfil: ${error}`);
            }

            this.editing = false;
        },
    }
    ,
    mounted() {
        this.loading = true;

        suscribeToAuth((userCredentials) => {
            this.user.email = userCredentials.email;
            this.user.id = userCredentials.id;
            this.user.username = userCredentials.username;
        })

        this.loading = false;
    }

};
</script>

<template>
    <section class="bg-[var(--bg-color)]">
        <div class="flex min-h-screen flex-1 mx-auto max-w-[1200px]">

            <Aside :username="user.username" :email="user.email" class="px-10 py-5 border-r-slate-800"></Aside>

            <main class="w-3/4 max-h-screen overflow-y-scroll text-white border-r-slate-800 border-r-2">
                <div>
                    <div class="border-b-2 border-slate-800 p-5 flex items-center justify-between">
                        <h2 class="text-xl font-medium">Editar mi perfil</h2>
                        <button v-if="user.id" @click="handleLogout"
                            class="text-sm font-medium text-white bg-red-600 py-3 px-5 rounded ">Cerrar sesión</button>
                    </div>
                    <div class="flex flex-col items-start mb-8 px-10 py-10">
                        <form action="#" @submit.prevent="handleSubmit" class="flex flex-col">
                            <label for="Nombre" class=" my-3">Nombre:</label>
                            <input type="text" class="text-slate-950 p-2 rounded-lg" v-model="user.username">
                            <label for="Nombre" class=" my-3">Email:</label>
                            <input type="text" class="text-slate-950 p-2 rounded-lg" v-model="user.email">
                            <button type="submit" class=" bg-green-500 py-2 rounded-lg mt-7">Actualizar</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    </section>
</template>


