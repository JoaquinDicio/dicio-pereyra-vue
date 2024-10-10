<script>
import { getUserById } from '../utils/getPosts.js'; // Asegúrate de importar la función

export default {
    name: 'CommentsList',
    props: {
        comments: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            commentsWithUsernames: []
        };
    },
    methods: {
        async fetchUsernames() {
            const updatedComments = await Promise.all(
                this.comments.map(async (comment) => {
                    const user = await getUserById(comment.userId);
                    return { ...comment, username: user.username };
                })
            );
            this.commentsWithUsernames = updatedComments;
        },
        formatDate(date) {
            return new Date(date).toLocaleString();
        }
    },
    async mounted() {
        await this.fetchUsernames();
    }
};
</script>

<template>
    <div class="mt-5">
        <h3 class="font-medium text-lg">Comentarios</h3>
        <div v-if="commentsWithUsernames.length === 0" class="p-5">
            <p>No hay comentarios todavía.</p>
        </div>
        <div v-for="(comment, index) in commentsWithUsernames" :key="index" class="p-3 border-b border-slate-700">
            <p><strong>{{ comment.username }}</strong>: {{ comment.text }}</p>
        </div>
    </div>
</template>
