<script>
export default {
    name: "CommentsList",
    props: {
        comments: {
            type: Array,
            required: true,
            default: () => [],
        },
    },
};
</script>

<template>
    <ul>
        <li v-for="comment in comments" :key="comment.id" class="border-b-2 border-slate-800 px-5 py-4">
            <div class="flex gap-3">
                <img :src="comment.userImg" :alt="comment.username" class="rounded-full w-[45px] h-[45px]">
                <div>
                    <p class="font-bold">{{ comment.username }}</p>
                    <p>{{ comment.text }}</p>
                </div>
            </div>
        </li>
    </ul>
</template>
