import url from './app.js'
import fetch from './fetch.js'
class Address{
    static getList(){
        return fetch(url.addressList)
    }
    static add(data){
        return fetch(url.addressAdd,data)
    }
    static remove(id){
        return fetch(url.addressRemove,id)
    }
    static update(data){
        return fetch(url.addressRemove,data)
    }
    static setDafault(id){
        return fetch(url.addressSetDefault,id)
    }
}
export default Address