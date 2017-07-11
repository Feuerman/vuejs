<template>
    <div class="container">
        <h1>Галерея</h1>
        <div class="gallery">
        </div>
    </div>
</template>

<script>
    import { getPhotos } from '../api/photo'
    import GalleryItem from '../components/GalleryItem.vue'
    import gql from 'graphql-tag'

    const dataQuery = gql`
      query data {
        classes {
          id,
          name
        }
      }
    `

    export default {
        components: { GalleryItem },
        data() {
            return {
                data: {},
                loading: 0
            }
        },
        created() {
            this.fetchData()
        },
        apollo: {
            data: {
                query: dataQuery,
                loadingKey: 'loading',
            }
        }
    }
</script>