//使用Vuex插件
import Vuex from 'vuex'
import Vue from 'vue'
import Address from 'js/addressService.js'
Vue.use(Vuex)
//创建Vuex实例
const store = new Vuex.Store({
    state:{
        lists:null
    },
    mutations:{
        init(state,lists){   //mutations中方法的第一个参数state是必需的
            state.lists = lists
        },
        add(state,instance){
            state.lists.push(instance)
        },
        remove(state,id){
            let index = state.lists.findIndex(item => {
                return item.id === id
            })
            state.lists.splice(index,1)
        },
        update(state,instance){
            let lists = JSON.parse(JSON.stringify(state.lists)) //一定要深复制
            let index = lists.findIndex(item => {
                return item.id === instance.id
            })
            lists[index] = instance
            state.lists = lists
        },
        setDefault(state,id){
             state.lists.forEach(item =>{
                item.isDefault = item.id === id ? true :false
            })

        }
    },
    actions:{
        getLists({commit}){ //在主程序中调用这个方法
            Address.getList().then(res => {
                commit('init',res.data.lists)
            })
        },
        addAction({commit},instance){
            Address.add(instance).then(res => {
                commit('add',instance)
            })
        },
        removeAction({commit},id){
            Address.remove(id).then(res => {
                commit('remove',id)
            })
        },
        updateAction({commit},instance){
           Address.update(instance).then(res => {
               commit('update',instance)
           }) 
        },
        setDefaultAction({commit},id){
            Address.setDefault(id).then(res => {
                commit('setDefault',id)
            })
        }
    }
})

export default store