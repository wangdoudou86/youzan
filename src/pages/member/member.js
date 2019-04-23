import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = [{
    path:'/',
    component: require('./components/member.vue')
},{
    path:'/address',
    component: require('./components/address.vue'),
    children:[{
        path:'',
        redirect: 'addressList'
    },{
        path: 'addressList',
        name: 'addressList',
        component: require('./components/addressList.vue')
    },{
        path: 'form',
        name: 'form',
        component: require('./components/form.vue')
    }]
}]
let router = new Router({
    routes
})

new Vue({
    el:'#app',
    router
})