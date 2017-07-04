<template>
    <transition name="slide-fade">
        <div class="news-list" v-if="news.length">
            <div class="news-list__item" v-for="item in news">
                <div class="news-list__item-head">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="info">
                        <span class="info-date">{{ item.publishedAt }}</span>
                        <span class="info-author">{{ item.author }}</span>
                    </div>
                </div>
                <div class="news-list__item-content">
                    <div class="image">
                        <img :src="item.urlToImage" alt="" width="200">
                    </div>
                    <div class="text">
                        {{ item.description }}
                    </div>
                </div>
                <div class="news-list__item-link">
                    <a :href="item.url">Подробнее</a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { getNews } from '../api/news'

    export default {
        props: ['source'],
        data() {
            return {
                news: []
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            'source': 'fetchData'
        },
        methods: {
            fetchData() {
                this.news = [];
                getNews(this.source)
                    .then((response) => {
                        this.news = response.data.articles
                    })
            }
        }
    }
</script>