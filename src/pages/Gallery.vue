<template>
    <div class="container">
        <h1>Галерея</h1>
        <div class="gallery">
            <div class="gallery__item" v-for="item in data">
                {{item.created_at}}
            </div>
        </div>
    </div>
</template>

<script>
    import { getPhotos } from '../api/photo'
    export default {
        data() {
            return {
                data: []
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                getPhotos({
                    per_page: 5
                })
                    .then((response) => {
                        this.data = response.data
                    })
            }
        }
    }
</script>