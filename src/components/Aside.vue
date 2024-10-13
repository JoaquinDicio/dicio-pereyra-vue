<script>
import Home from '../pages/Home.vue';
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
    <aside class="flex flex-col justify-between border-r-2 text-white md:px-10 py-5 sm:max-w-96 ">
        <div>
            <nav>
                <h1 class="font-bold text-2xl mb-10 hidden md:block text-center">NotTwitter</h1>
                <ul class="space-y-4 mb-12 flex flex-col items-center">
                    <li>
                        <router-link :to="`/home`"
                            class="hover:font-medium transition flex justify-center md:justify-start md:min-w-[200px]">
                            <div class="flex md:gap-5 items-center">
                                <div><i class="fas fa-home text-3xl"></i></div>
                                <div><span class="hidden md:inline">Inicio</span></div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="`/explore`"
                            class="hover:font-medium transition flex justify-center md:justify-start md:min-w-[200px]">
                            <div class="flex md:gap-5 items-center">
                                <div><i class="fas fa-hashtag text-3xl"></i></div>
                                <div><span class="hidden md:inline">Explorar</span></div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="`/notifications`"
                            class="hover:font-medium transition flex justify-center md:justify-start md:min-w-[200px]">
                            <div class="flex md:gap-5 items-center">
                                <div><i class="fas fa-bell text-3xl"></i></div>
                                <div><span class="hidden md:inline">Notificaciones</span></div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="`/messages`"
                            class="hover:font-medium transition flex justify-center md:justify-start md:min-w-[200px]">
                            <div class="flex md:gap-5 items-center">
                                <div><i class="fas fa-envelope text-3xl"></i></div>
                                <div><span class="hidden md:inline">Mensajes</span></div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="`/saved`"
                            class="hover:font-medium transition flex justify-center md:justify-start md:min-w-[200px]">
                            <div class="flex md:gap-5 items-center">
                                <div><i class="fas fa-bookmark text-3xl"></i></div>
                                <div><span class="hidden md:inline">Guardados</span></div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </nav>
        </div>
        <router-link v-if="user.id" :to="`/profile/${user.id}`"
            class="flex items-center gap-3 justify-center min-w-[100px]">
            <img class="rounded-full w-[45px]" :src="user.img" alt="foto de perfil" />
            <div>
                <p class="font-medium hidden md:block text-center">{{ user.username }}</p>
                <p class="font-ligther text-xs hidden md:block text-center">@{{ user.email }}</p>
            </div>
        </router-link>
        <div v-else>
            <p class="text-center">Cargando...</p>
        </div>
    </aside>

</template>
