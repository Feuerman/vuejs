<template>
    <div class="container">
        <div class="comments">
            <form @submit="addComment">
                <input type="text" v-model="name">
            </form>
            <button @click="sort">sort</button>
            <Comment v-for="(item, key) in comments" :key="key" :data="item"></Comment>
        </div>
    </div>
</template>

<script>
    import Comment from '../components/Comment.vue'

    export default {
        data() {
            return {
                comments: [],
                name: ''
            }
        },
        components: { Comment },
        methods: {
            addComment(e) {
                e.preventDefault()

                let comment = {
                    text: this.name,
                    rating: 0
                }
                this.comments.push(comment)
            },
            sort() {
                this.comments.sort((a, b) => {
                    return +a.rating - +b.rating
                })
            }
        }
    }
</script>