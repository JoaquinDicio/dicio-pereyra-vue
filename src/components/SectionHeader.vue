<script>
import { logout } from '../services/auth';

export default {
    name: "SectionHeader",
    props: ['sectionName'],
    methods: {
        handleLogout() {
            logout()
        }
    }
}
</script>

<template>
    <div class="border-b-2 border-slate-800 p-5 flex items-center justify-between">
        <h2 class="text-xl font-medium">{{ sectionName }}</h2>
        <button @click="handleLogout" class="text-sm font-medium text-white bg-red-600 py-3 px-5 rounded ">Cerrar
            sesión</button>
    </div>
</template>