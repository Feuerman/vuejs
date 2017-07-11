<template>
    <div class="container">
        <div class="comments">
            <form @submit="addComment">
                <input type="text" v-model="name">
            </form>
            <input type="text" v-model="filter">
            <button @click="sort">sort</button>
            <Comment v-for="(item, key) in filteredCommetns" :key="key" :data="item"></Comment>
        </div>
    </div>
</template>

<script>
    import Comment from '../components/Comment.vue'

    export default {
        data() {
            return {
                comments: [],
                name: '',
                filter: ''
            }
        },
        computed: {
            filteredCommetns() {
                let comments = this.comments
                if(this.filter) {
                    comments = comments.filter((item) => {
                        return item.text.indexOf(this.filter) > -1
                    })
                }
                return comments;
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