<script>
export default {
    name: "Aside"
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
        <a href="" class="flex items-center gap-3">
            <img class="rounded-full w-[45px]" src="https://picsum.photos/200/200" alt="foto de perfil" />
            <div>
                <p class="font-medium">nickname</p>
                <p class="font-ligther">@username</p>
            </div>
        </a>
    </aside>
</template>