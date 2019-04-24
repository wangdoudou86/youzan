import Address from 'js/addressService.js'

export default {
    data(){
        return {
            name:'',
            tel:'',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            id:'',
            type: this.$route.query.type,
            instance: this.$route.query.instance,
            addressData: require('js/address.json'),
            cityList: null,
            districtList: null
        }
    },
    created(){
        if(this.type === 'edit'){
            let ad = this.instance
            this.name = ad.name
            this.tel = ad.tel
            this.provinceValue = parseInt(ad.provinceValue)
            this.address = ad.address
            this.id = ad.id
        }
    },
    watch:{
        provinceValue(val){
            if(val === -1) return
            let list = this.addressData.list
            let index = list.findIndex(item=>{
                return item.value === val
            }) //找到这个新val值在list里的下标
            this.cityList = list[index].children
            this.cityValue = -1
            this.districtValue = -1
            if(this.type === 'edit'){
                this.cityValue = parseInt(this.instance.cityValue)
            }
        },
        cityValue(val){
            if(val === -1) return
            let list = this.cityList
            let index = list.findIndex(item => {
                return item.value === val
            })
            this.districtList = list[index].children
            this.districtValue = -1
            if(this.type === 'edit'){
                this.districtValue = parseInt(this.instance.districtValue)
            }
        }
    },
    methods:{
        add(){
            let {name,tel,provinceValue,cityValue,districtValue,address} = this
            let data = {name,tel,provinceValue,cityValue,districtValue,address}
            if(data.name==='' || data.tel==='' || data.provinceValue=== -1 || data.cityValue=== -1 ||
            data.districtValue=== -1 || data.address===''){
                alert('请填写完整信息')
            }else{
                if(this.type === 'add'){
                    Address.add(data).then(res=>{
                        this.$router.go(-1)
                    })
                }
                if(this.type === 'edit'){
                    data.id = this.id
                    Address.update(data).then(res=>{
                        this.$router.go(-1)
                    })
                }
            }
        },
        remove(){
            if(window.confirm('确定删除？')){
                Address.remove(this.id).then(res=>{
                    this.$router.go(-1)
                })
            }
        },
        setDefault(){
            Address.setDafault(this.id).then(res=>{
                this.$router.go(-1)

            })
        }
    }
}