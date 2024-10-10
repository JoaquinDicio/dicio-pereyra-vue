<script>
export default {
    name: 'CommentsList',
    props: {
        comments: {
            type: Array,
            required: true
        }
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleString();
        }
    }
};
</script>


<template>
    <div class="mt-5">
        <h3 class="font-medium text-lg">Comentarios</h3>
        <div v-if="comments.length === 0" class="p-5">
            <p>No hay comentarios todavía.</p>
        </div>
        <div v-for="(comment, index) in comments" :key="index" class="p-3 border-b border-slate-700">
            <p><strong>{{ comment.userId }}</strong>: {{ comment.text }}</p>
        </div>
    </div>
</template>
