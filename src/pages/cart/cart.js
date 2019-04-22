import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/app.js'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import Cart from 'js/cartService.js'
new Vue({
    el:'.container',
    data:{
        lists:null,
        totalPrice:0,
        totalNum:0,
        editingShop: null,
        editingShopIndex: -1,
        removePopup: false,
        removeMsg:'',
        removeData:null
        },
    computed:{
        allSelected:{
            get(){
                if(this.lists&&this.lists.length){
                    return this.lists.every(shop=>{ //every的值要return出去
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                this.lists.forEach(shop=>{
                    shop.checked = newVal
                    shop.goodsList.forEach(good=>{
                        good.checked = newVal
                    })
                })
            }
        },
        selectdList(){
            if(this.lists&&this.lists.length){
                let arr = []
                let total = 0
                let totalNum = 0
                this.lists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good)
                            total += good.price * good.number
                            totalNum = arr.length
                        }
                    })
                })
                this.totalPrice = total
                this.totalNum = totalNum
                return arr
            }
                return []
        },
        allRemoveSelected:{
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good=>{
                        good.removeChecked = newVal
                    })
                }
            }
        },
        removeList(){
            if(this.editingShop){
                let arr = []
                this.editingShop.goodsList.forEach(good=>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(){
            axios.get(url.cartList).then( res => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editMsg = '编辑'
                    shop.editing = false
                    shop.goodsList.forEach(good =>{
                        good.checked = true
                        good.removeChecked = false
                    })
                })
                this.lists = lists
            })
        },
        selectGood(good,shop){
            let atrr = this.editingShop ? 'removeChecked' : 'checked'
            good[atrr] = !good[atrr]
            shop[atrr] = shop.goodsList.every(good=>{
                return good[atrr]
            })
        },
        selectShop(shop){
            let atrr = this.editingShop ? 'removeChecked' : 'checked'
            shop[atrr] = !shop[atrr]
            shop.goodsList.forEach(good=>{
                good[atrr] = shop[atrr]
            })
        },
        selectAll(){
            let atrr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
            this[atrr] = !this[atrr]
        },
        edit(shop,shopIndex){
            shop.editing = !shop.editing
            shop.editMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item,id)=>{
                if(shopIndex !== id){
                    item.editing = false
                    item.editMsg = shop.editing ? '' : '编辑'
                }
            })
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
        },
        reduce(good){
            if(good.number === 1) return
            Cart.reduce(good.id).then(res=>{
                    good.number--
                })
        },
        add(good){ 
            Cart.add(good.id).then(res=>{
                    good.number++
                })
        },
        remove(good,goodIndex,shop,shopIndex){
            this.removePopup =  true
            this.removeMsg = '确定删除该商品吗'
            this.removeData = {good,goodIndex,shop,shopIndex}
        },
        removeSeveral(){
            this.removePopup =  true
            this.removeMsg = `确定将所选${this.removeList.length}个商品删除吗`
        },
        removeConfirm(){
            if(this.removeMsg==='确定删除该商品吗'){
                let {good,goodIndex,shop,shopIndex} = this.removeData
                Cart.remove(good.id).then(res=>{
                    shop.goodsList.splice(goodIndex,1)
                    if(shop.goodsList.length===0){
                        this.lists.splice(shopIndex,1)
                        this.changeOtherShop()
                    }
                    this.removePopup = false
                })
            }else{
                let ids = []
                this.removeList.forEach(good=>{
                    ids.push(good.id)
                })
                axios.post(url.cartMremove, {
                    ids
                }).then(res => {
                    let arr = []
                    this.editingShop.goodsList.forEach(good=>{
                        if(ids.indexOf(good.id)===-1){
                            arr.push(good)
                        }
                        return arr
                    })
                    if(arr.length){
                        this.editingShop.goodsList = arr
                    }else{
                        this.lists.splice(this.editingShopIndex,1)
                        this.changeOtherShop()
                    }
                    this.removePopup = false
                })
            }
        },
        changeOtherShop(){
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop=>{
                shop.editing = false
                shop.editMsg = '编辑'
            })
        },
        start(e,good){
            good.startX = e.changedTouches[0].clientX
        },
        end(e,good,shopIndex,goodIndex){
            let endX = e.changedTouches[0].clientX
            let left = '0px'
            if(good.startX - endX > 100){
                left = '-60px'
            }
            if(endX - good.startX > 100){
                left = '0px'
            }
            Velocity(this.$refs[`good-${shopIndex}-${goodIndex}`],
            {left},"ease-in-out")
        }
    },
    mixins:[mixin]
})