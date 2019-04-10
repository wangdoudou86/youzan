import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/app.js'
import qs from 'qs'
import mixin from 'js/mixin'
import Swipe from 'components/Swipe.vue'

let {id} = qs.parse(location.search.substr(1))
let detailTab = ['商品详情','本店成交']
new Vue({
    el:'#app',
    data:{
        details:null,
        detailTab,
        tabIndex:0,
        dealLists:null,
        swipeLists:[],
        showSku: false,
        skuType:1,
        skuNum: 1,
        isAddCart: false,
        showAddMessage: false
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail(){
            axios.get(url.details,{id}).then(res => {
                let data = res.data.data
                this.details = data
                this.details.imgs.forEach(item => {
                    this.swipeLists.push({
                        clickUrl:'',
                        image:item
                    })
                })

            })
        },
        changeTab(index){
            this.tabIndex = index
            if(index){
                this.getDealList()
            }
        },
        getDealList(){
            axios.get(url.deal,{id}).then(res => {
                this.dealLists = res.data.data.lists
            })
        },
        chooseSku(type){
            this.skuType = type
            this.showSku = true
        },
        changeSkuNum(num){
            if(num<0 && this.skuNum===1)return 
            this.skuNum += num
        },
        addCart(){
            axios.post(url.cartAdd,{id,number:this.skuNum}).then(res => {
                if(res.data.status === 200){
                    this.isAddCart = true
                    this.showSku = false
                    this.showAddMessage = true
                    setTimeout(()=>{
                      this.showAddMessage = false
                    },1000) 
                }
            })
        }
    },
    watch:{
        showSku(val){ //监听当弹框的布尔值，控制不让弹框上滑
            document.body.style.overflow = val ? 'hidden' : 'auto'
            document.body.style.height = val ? '100%' : 'auto'
            document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
            document.querySelector('html').style.height = val ? '100%' : 'auto'
        }
    },
    components:{Swipe},
    mixins:[mixin]
})