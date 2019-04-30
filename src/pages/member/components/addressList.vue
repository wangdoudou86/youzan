<template>
<div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block" v-if="lists&&lists.length">
      <a class="block-item js-address-item address-item" :class="{'address-item-default':list.isDefault}"
       v-for="list in lists" :key="list.id">
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit" @click="toEdit(list)">修改</a>
      </a>
     
    </div>
    <div v-if="lists&&!lists.length">没有地址，请添加</div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" :to="{name:'form',query:{type:'add'}}">
            新增地址
        </router-link>
    </div>
</div>
</template>
<script>
import Address from 'js/addressService.js'
export default {
    created(){
        // Address.getList().then(res=>{
        //     this.lists = res.data.lists
        // })
        if(!this.lists){
            this.$store.dispatch('getLists')
        }
    },
    computed:{
        lists(){
            return this.$store.state.lists
        }
    },
    methods:{
        toEdit(list){
            this.$router.push({name:'form',query:{
                type:'edit',
                instance: list
            }})
        }
    }
    

}
</script>
<style scoped>

</style>
