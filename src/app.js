import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import VueD3 from 'vue-d3'
import * as VueGoogleMaps from 'vue2-google-maps'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.esm'
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import VueApollo from 'vue-apollo';

import App from './App.vue'
import router from './router/index'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueD3)


const networkInterface = createNetworkInterface({
    uri: 'http://app1.eis.devncem.ru:8181/ktru',
    transportBatching: true
});

const apolloClient = new ApolloClient({
    networkInterface,
    ssrForceFetchDelay: 100,
    connectToDevTools: true,
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCHnsjcdExgBxevGm0Wcxf6GUMe3k0xjcQ',
        libraries: ['places', 'geometry', 'drawing']
    }
});

new Vue({
    el: '#app',
    store,
    router,
    apolloProvider,
    render: h => h(App)
});