<script>
export default {
    name: 'CommentItem',
    props: {
        comment: {
            type: Object,
            required: true
        }
    }
};
</script>
<template>
    <div class="p-3 border-b border-slate-700">
        <div class="flex gap-3 align-middle items-center">
            <img :src="comment.img" class="rounded-full w-[45px] h-[45px]">
            <router-link :to="`/profile/${comment.userId}`" class="font-bold">{{ comment.username }}</router-link>
            <span class="text-gray-500">{{ comment.email }}</span>
        </div>
        <p class="mt-5">{{ comment.text }}</p>
    </div>
</template>