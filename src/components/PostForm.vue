<script>
export default {
    name: "PostForm",
    data() {
        return {
            text: ""
        }
    },
    methods: {
        handleSubmit() {
            this.$emit('post-submit', this.text)
            this.text = ''
        }
    }
}

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <textarea v-model="text" name="text" id="text" rows="3" class="p-5 bg-transparent w-full"
            placeholder="¡¿Qué está pasando?!"></textarea>
        <div class="pb-2 flex items-center">
            <input type="submit" class=" hover:bg-indigo-800 cursor-pointer transition  w-full px-4 py-2 bg-indigo-900"
                value="Publicar">
        </div>
    </form>
</template>