import Vue from 'vue'

const CONFIG = {
    url: 'http://api.geonames.org/',
    username: 'feuerman',
    count: 10
}

export function textSearch(q, count) {
    return Vue.http.get(CONFIG.url + 'searchJSON', {
        params: {
            name: q,
            username: CONFIG.username,
            maxRows: count || CONFIG.count,
            lang: 'ru',
            orderBy: 'population'
        }
    })
}