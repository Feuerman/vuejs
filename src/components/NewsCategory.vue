<template>
    <section class="select-category">
        <select @change="getNewsFromCategory" v-model="current">
            <option
                    v-for="item in categories"
                    :value="item.id">
                {{ item.name }}
            </option>
        </select>
    </section>
</template>

<script>
    import { getCategories } from '../api/news'

    export default {
        props: ['source'],
        data() {
            return {
                categories: [],
                current: this.source
            }
        },
        created() {
            this.fetchCategories()
        },
        methods: {
            fetchCategories() {
                getCategories()
                    .then((response) => {
                        this.categories = response.data.sources
                    })
            },
            getNewsFromCategory(e) {
                this.$emit('change', e.target.value)
            }
        }
    }
</script>