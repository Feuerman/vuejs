<template>
    <div class="container">
        <h1>Галерея</h1>
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
                        console.log(response)
                    })
            }
        }
    }
</script>