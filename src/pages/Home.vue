<template>
    <div class="container">
        <h1>Home</h1>
        <div class="products">
            <Product v-for="(item, index) in products" :data="item" :key="index"></Product>
        </div>
    </div>
</template>

<script>
    import { getProducts } from '../api/products'
    import Product from '../components/Product.vue'

    export default {
        components: { Product },
        data() {
            return {
                products: []
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData() {
                this.products = getProducts()
            }
        }
    }
</script>