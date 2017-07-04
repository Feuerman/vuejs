<template>
    <div class="container">
        <h1>News</h1>
        <section class="news">
            <NewsCategory @change="changeCategory" :source="this.source"></NewsCategory>
            <NewsList :source="this.source"></NewsList>
        </section>
    </div>
</template>

<script>
    import NewsList from '../components/NewsList.vue'
    import NewsCategory from '../components/NewsCategory.vue'

    export default {
        components: { NewsList, NewsCategory },
        data() {
            return {
                source: 'bbc-sport'
            }
        },
        methods: {
            changeCategory(str) {
                this.source = str
            }
        }
    }
</script>