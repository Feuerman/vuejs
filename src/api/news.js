import Vue from 'vue'

const CONFIG = {
    url: 'https://newsapi.org/v1/',
    key: '49503bb8735c4617bc33c1d9c37ea61a',
    defaultSource: 'cnn'
}

const paramsDefault = {
    apiKey: CONFIG.key
}

export function getNews(source, sort) {
    return Vue.http.get(CONFIG.url + 'articles', {
        params: {
            source: source || CONFIG.defaultSource,
            sortBy: sort,
            ...paramsDefault
        }
    })
}

export function getCategories(lang, country) {
    return Vue.http.get(CONFIG.url + 'sources', {
        params: {
            language: lang,
            country: country,
            ...paramsDefault
        }
    })
}