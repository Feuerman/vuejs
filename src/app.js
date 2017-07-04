import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import VueD3 from 'vue-d3'
import * as VueGoogleMaps from 'vue2-google-maps'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.esm'

import App from './App.vue'
import router from './router/index'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueD3)

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCHnsjcdExgBxevGm0Wcxf6GUMe3k0xjcQ',
        libraries: ['places', 'geometry', 'drawing']
    }
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')