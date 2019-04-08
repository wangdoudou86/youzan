import './index.css'
import 'css/common.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/app.js'

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'


import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

let app = new Vue({
    el:'#app',
    data:{
        lists:null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoaded:false,
        bannerLists:null
    },
    created(){
        this.getLists(),
        this.getBanner()
    },
    methods:{
        getLists(){
            if(this.allLoaded) return
            this.loading = true
            axios.get(url.hotLists,{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then(res => {
                let currentLists = res.data.lists
                if(currentLists.length < this.pageSize){
                    this.allLoaded = true
                } 
                if(this.lists){
                    this.lists = this.lists.concat(currentLists)
                }else{
                    this.lists = currentLists
                } 
                this.pageNum++ 
                this.loading = false                    
            })
        },
        getBanner(){
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
                }
            )
        }
    },
    components: {
        Foot,
        Swipe
    }
})