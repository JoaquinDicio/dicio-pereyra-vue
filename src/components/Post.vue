<script>
export default {
    name: "Post",
    props: ['username', 'img', 'text']
}
</script>

<template>
    <div class="w-full border-b-2 px-5 p-7 border-slate-800 flex gap-3">
        <img :src="img" :alt="username" class="rounded-full w-[45px] h-[45px]">
        <div>
            <p class="font-medium">{{ username }}</p>
            <p>{{ text }}</p>
        </div>
    </div>
</template>