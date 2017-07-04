<template>
    <div class="container">
        <h1>Weather</h1>
        <GeoNames></GeoNames>
        <div class="weather-list">
            <div class="weather-list__item" v-for="item in this.$store.state.weather">
                {{ item.date }}
                {{ item.temp }}
                <img :src="item.icon" alt="">
            </div>
        </div>
        <div class="weather-graph">
            <Chart :weather="this.$store.state.weather"></Chart>
        </div>
    </div>
</template>

<script>
    import Chart from '../components/ChartWeather.vue'
    import GeoNames from '../components/GeoNames.vue'
    import { mapActions } from 'vuex'

    export default {
        components: {
            Chart,
            GeoNames
        },
        data() {
            return {
                weather: [],
                city: 'Moskow'
            }
        },
        created() {
            this.getData()
        },
        methods: {
            ...mapActions([
                'getWeather'
            ]),
            getData() {
                this.getWeather({
                    q: this.$store.state.city,
                    cnt: 16
                })
            }
        }
    }
</script>

<style>
    .weather-list {
        float: left;
    }
    .weather-graph {
        float: right;
        overflow: hidden;
    }
</style>