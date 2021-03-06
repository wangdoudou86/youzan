import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/app.js'
import Foot from 'components/Foot.vue'
import mixin from 'js/mixin'
new Vue({
    el:'#app',
    data:{
        topLists:null,
        topIndex:0,
        subList:null,
        rankData:null
    },
    created(){
        this.getTopList()
        this.getSubList(0)
    },
    methods:{
        getTopList(){
            axios.get(url.topLists).then(res =>{
                this.topLists = res.data.lists
            })
        },
        getSubList(index,id){
            this.topIndex = index
            if(index === 0){
                this.getRank()
            }else if(id === 1){
                axios.post(url.subListFood,{id}).then(res =>{
                    this.subList = res.data.data
                })
            }else if(id === 800){
                axios.post(url.subListWomen,{id}).then(res =>{
                    this.subList = res.data.data
                })
            }else if(id === 810){
                axios.post(url.subListMen,{id}).then(res =>{
                    this.subList = res.data.data
                })
            }else if(id === 817){
                axios.post(url.subListDigital,{id}).then(res =>{
                    this.subList = res.data.data
                })
            }
            
        },
        getRank(){
            axios.get(url.rank).then(res =>{
                this.rankData = res.data.data
            }) 
        },
       toSearch(list){
           location.href = `search.html?keyword=${list.name}&id=${list.id}`
       }
    },
    components:{
        Foot
    },
    mixins:[mixin]
})