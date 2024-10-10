<script>
import Post from './Post.vue';

export default {
    name: "ListPosts",
    props: ['posts'],
    components: { Post },
}
</script>

<template>
    <ul>
        <li v-for="post in posts">
            <Post :userId="post.userId" :img="post.img" :text="post.text" :username="post.username" :postId="post.id" />
        </li>
    </ul>
</template>