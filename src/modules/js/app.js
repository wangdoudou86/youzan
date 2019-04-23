let url = {
    hotLists:'/index/hotLists',
    banner:'/index/banner',
    topLists:'/category/topList',
    rank:'/category/rank',
    subList:'/category/subList',
    searchList:'/search/list',
    details:'/goods/details',
    deal:'/goods/deal',
    cartAdd:'/cart/add',
    cartRemove:'/cart/remove',
    cartMremove: '/cart/mremove',
    cartReduce: '/cart/reduce',
    cartList: '/cart/list',
    cartUpdate: '/cart/update',
    addressList: '/address/list',
    addressAdd: '/address/add',
    addressRemove: '/address/remove',
    addressUpdate: '/address/update',
    addressSetDefault: '/address/setDefault'
}

let host = 'https://www.easy-mock.com/mock/5c45f81e0714c82b413833d1/shop'

for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
    }
}

export default url