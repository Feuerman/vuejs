import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Weather from '../pages/Weather.vue'
import Comments from '../pages/Comments.vue'
import GoogleMap from '../pages/GoogleMap.vue'
import Gallery from '../pages/Gallery.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/news', component: News },
    { path: '/weather', component: Weather },
    { path: '/comments', component: Comments },
    { path: '/google-map', component: GoogleMap },
    { path: '/gallery', component: Gallery },
    { path: '/*', redirect: '/' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
