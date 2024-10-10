<script>
export default {
    name: "Post",
    props: ['username', 'userImg', 'text', 'userId', 'postId']
}
</script>

<template>
    <div class="w-full border-b-2 px-5 p-7 border-slate-800 flex gap-3">
        <img :src="userImg" :alt="username" class="rounded-full w-[45px] h-[45px]">
        <div>
            <router-link :to="`/profile/${userId}`" class="font-medium">{{ username }}</router-link>
            <p>{{ text }}</p>
            <router-link :to="`/${postId}`" class="font-medium">Comentarios</router-link>
        </div>
    </div>
</template>