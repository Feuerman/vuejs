import Vue from 'vue'

const CONFIG = {
    url: 'http://api.openweathermap.org/',
    key: '5d666956ee771196ad0f0b35c78a0e5e'
}

const defaultParams = {
    APPID: CONFIG.key,
    units: 'metric',
    lang: 'ru'
}

export function getWeather (params) {
    return Vue.http.get(CONFIG.url + 'data/2.5/forecast/daily', {
        params: {
            ...defaultParams,
            ...params
        }
    })
}

