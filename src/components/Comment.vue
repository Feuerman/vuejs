<template>
    <div class="comment">
        <button @click="ratingUp">up</button>
        {{ data.rating }}
        {{ data.text }}
    </div>
</template>

<script>
    export default {
        props: ['data'],
        methods: {
            ratingUp() {
                this.data.rating++
            }
        }
    }
</script>