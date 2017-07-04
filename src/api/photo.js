import Vue from 'vue'

const CONFIG = {
    url: 'http://api.unsplash.com/photos',
    key: '42431486eda2e6beeb3764b7dd89568297766bfe93f8d2e297eebe51510ce3f9'
}

const paramsDefault = {
    client_id: CONFIG.key
}

export function getPhotos(params) {
    return Vue.http.get(CONFIG.url, {
        params: {
            ...params,
            ...paramsDefault
        }
    })
}
