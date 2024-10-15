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
    methods: {
    formatDate(timestamp) {
        const date = new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000));
        const formatter = new Intl.DateTimeFormat('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        return formatter.format(date).replace(',', '');
    }
},
};
</script>

<template>
    <ul>
        <li v-for="comment in comments" :key="comment.id" class="border-b-2 border-slate-800 px-5 py-4">
            <div class="flex gap-3">
                <img :src="comment.userImg" :alt="comment.username" class="rounded-full w-[45px] h-[45px]">
                <div>
                    <router-link :to="`/profile/${comment.userId}`" class="font-bold">{{ comment.username }}</router-link>
                    <p>{{ comment.text }}</p>
                    <p class="text-gray-400">{{ formatDate(comment.createdAt) }}</p>
                </div>
            </div>
        </li>
    </ul>
</template>
