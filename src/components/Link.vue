<script>
    export default {
        name:"Link",
        props:['route','type']
    }
</script>

<template>
    <router-link v-if="type == 'primary'" class="rounded-xl bg-indigo-900 font-medium px-4 py-2 hover:bg-indigo-800 transition" :to="{name:route}"><slot/></router-link>
    <router-link v-if="type == 'secondary'" class="rounded-xl border-white border text-white font-medium px-4 py-2 hover:bg-white hover:text-[#11212d] transition" :to="{name:route}">Registrarse</router-link>
</template>