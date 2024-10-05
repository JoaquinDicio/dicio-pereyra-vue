<script>
    export default {
        name:"SecondaryLink",
        props:["route"]
    }
</script>

<template>
     <router-link class="rounded-xl border-white border text-white font-medium px-4 py-2 hover:bg-white hover:text-[#11212d] transition" :to="{name:route}">Registrarse</router-link>
</template>