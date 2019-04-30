import fetch from './fetch.js'
import url from './app.js'

class Cart{
    static add(id){
        return fetch(url.cartAdd,{
            id,
            number: 1
        })
    }
    static reduce(id){
        return fetch(url.cartReduce,{
            id,
            number: 1
        })
    }
    static remove(id){
        return fetch(url.cartRemove,{id})
    }
}
export default Cart
