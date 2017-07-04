<template>
    <div class="search">
        <input type="text" placeholder="search..." v-model="search" @input="getGeoData">
        <div class="search-result" v-show="this.$store.state.showModal">
            <div class="search-result__item" v-for="item in this.$store.state.geoNames" @click="getWeatherData(item)">
                <span>{{ item.name }}</span>
                <span>{{ item.adminName1 }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data() {
            return {
                search: ''
            }
        },
        methods: {
            ...mapActions([
                'getWeather',
                'geoSearch'
            ]),
            getWeatherData(item) {
                this.$store.commit('SHOW_MODAL', false)
                this.getWeather({
                    q: item.name + ' ' + item.adminName1
                })
            },
            getGeoData() {
                this.geoSearch(this.search)
            }
        }
    }
</script>

<style lang="scss">
    .search {
        position: relative;
        input {
            padding: 5px 10px;
            border: 1px #ccc solid;
        }
        &-result {
            position: absolute;
            top: 100%;
            margin-top: 10px;
            background-color: #fff;
            border: 1px #eee solid;
            box-shadow: 0 0 10px #eee;
            &__item {
                padding: 2px 10px;
                cursor: pointer;
                &:hover {
                    background-color: #0275d8;
                    color: #fff;
                }
                span + span {
                    color: #ccc
                }
            }
        }
    }
</style>