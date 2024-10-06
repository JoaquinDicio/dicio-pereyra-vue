<script>
import Post from './Post.vue';
import { db } from '../services/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default {
    name: "ListPosts",
    data() {
        return {
            loading: false,
            posts: [],
        }
    },
    components: { Post },
    methods: {
        async fetchPosts() {
            this.loading = true;
            const postsCollection = collection(db, "posts");
            const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
            onSnapshot(postsQuery, (snapshot) => {
                this.posts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                this.loading = false;
            });
        },
    },
    mounted() {
        this.fetchPosts()
    }
}
</script>

<template>
    <ul>
        <li v-if="loading" class="flex h-full items-center justify-center">
            <p>Cargando los ultimos posts...</p>
        </li>
        <li v-else v-for="post in posts">
            <Post :img="post.img" :text="post.text" :username="post.username" />
        </li>
    </ul>
</template>