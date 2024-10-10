<script>
import { suscribeToAuth } from '../services/auth';

export default {
    name: "Aside",
    data() {
        return {
            user: {}
        }
    },
    mounted() {
        suscribeToAuth((userCredentials) => {
            const { email, id, img, username } = userCredentials
            this.user.email = email;
            this.user.id = id;
            this.user.img = img
            this.user.username = username;
        })
    }
}
</script>

<template>
    <aside class="flex flex-col justify-between border-r-2 text-white">
        <div>
            <nav>
                <h1 class="font-bold text-2xl mb-10">NotTwitter</h1>
                <ul class="space-y-4 mb-12">
                    <li>
                        <a href="#" class="block  hover:font-medium transition">Inicio</a>
                    </li>
                    <li>
                        <a href="#" class="block  hover:font-medium transition">Explorar</a>
                    </li>
                    <li>
                        <a href="#" class="block  hover:font-medium transition">Notificaciones</a>
                    </li>
                    <li>
                        <a href="#" class="block  hover:font-medium transition">Mensajes</a>
                    </li>
                    <li>
                        <a href="#" class="block  hover:font-medium transition">Guardados</a>
                    </li>
                </ul>
            </nav>
            <button class="w-full rounded-xl font-medium bg-indigo-900 hover:bg-indigo-800 transition px-4 py-3">
                Postear +
            </button>
        </div>
        <router-link v-if="user.id" :to="`/profile/${user.id}`" class="flex items-center gap-3">
            <img class="rounded-full w-[45px]" :src="user.img" alt="foto de perfil" />
            <div>
                <p class="font-medium">{{ user.username }}</p>
                <p class="font-ligther text-xs">@{{ user.email }}</p>
            </div>
        </router-link>
        <div v-else>
            <p>Cargando...</p>
        </div>
    </aside>
</template>