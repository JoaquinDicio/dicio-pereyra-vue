<script>
import { getUserById } from '../services/posts.js';
import CommentItem from './CommentItem.vue'; // Importa el nuevo componente

export default {
    name: 'CommentsList',
    components: { CommentItem }, // Registra el componente
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
                    return { ...comment, username: user.username, img: user.img, email: user.email };
                })
            );
            this.commentsWithUsernames = updatedComments;
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
        <div v-for="(comment, index) in commentsWithUsernames" :key="index">
            <CommentItem :comment="comment" />
        </div>
    </div>
</template>
