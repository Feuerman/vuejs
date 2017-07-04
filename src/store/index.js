import Vue from 'vue'
import Vuex from 'vuex'

import { getWeather } from '../api/weather'
import { textSearch } from '../api/geo'

Vue.use(Vuex)

const state = {
    weather: [],
    city: 'Moskow',
    geoNames: [],
    showModal: false
}

const mutations = {
    WEATHER_SUCCESS: (state, weather) => {
        state.weather = weather.list.map((item) => {
           return {
               date: new Date(item.dt * 1000).toLocaleDateString(),
               temp: item.temp.day,
               icon: 'http://openweathermap.org/img/w/' + item.weather[0].icon + '.png'
           }
        })

        state.city = weather.city.name
    },
    GEO_SUCCESS: (state, geoNames) => {
        state.geoNames = geoNames
    },
    SHOW_MODAL: (state, visibility) => {
        state.showModal = visibility
    }
}

const actions = {
    getWeather: ({commit, state}, params) => {
        getWeather(Object.assign(
                { q: state.city,  cnt: 16 },
                { ...params }
            )
        )
            .then((response) => {
                commit('WEATHER_SUCCESS', response.data)
            })
    },
    geoSearch: ({commit, state}, query) => {
        if(query.length < 4) {
            commit('GEO_SUCCESS', [])
            return
        }
        textSearch(query)
            .then((response) => {
                commit('GEO_SUCCESS', response.data.geonames)
                commit('SHOW_MODAL', true)
            })
    }
}

const getters = {

}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})



