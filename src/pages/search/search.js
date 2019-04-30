import 'css/common.css'
import './search.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/app.js'
import qs from 'qs'
import Velocity from 'velocity-animate'
import mixin from 'js/mixin'

let {keyword,id} = qs.parse(location.search.substr(1)) //会解析成对象
new Vue({
   el:'.container',
   data:{
       searchList:null,
       isShow: false
   },
   created(){
       this.getSearchList()
   },
   methods:{
       getSearchList(){
           axios.post(url.searchList,{keyword,id}).then(res=>{
              this.searchList = res.data.lists
           })
       },
       move(){
           if(document.body.scrollTop > 100){
                this.isShow = true
           }else{
               this.isShow = false
           }
       },
       toTop(){
           Velocity(document.body,'scroll',{duration:200,easing: "spring" })
       }
   },
   mixins:[mixin]
})