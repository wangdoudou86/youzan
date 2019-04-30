
export default {
    data(){
        return {
            name:'',
            tel:'',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            provinceName: '',
            cityName: '',
            districtName: '',
            address: '',
            id:'',
            type: this.$route.query.type,
            instance: this.$route.query.instance,
            addressData: require('js/address.json'),
            cityList: null,
            districtList: null,
            isDefault: false
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
            this.isDefault = ad.isDefault
        }
    }, 
    // computed:{
    //     lists(){
    //         return this.$store.state.lists
    //     }
    // },   
    watch:{
        // lists:{ 
        //     handler(val) {
        //         console.log('我改变了'+ val)
        //         this.$router.push('/address')
        //     },
        //     deep: true
        // },
        provinceValue(val){
            if(val === -1) return
            let list = this.addressData.list
            let index = list.findIndex(item=>{
                return item.value === val
            }) //找到这个新val值在list里的下标
            this.cityList = list[index].children
            this.provinceName = list[index].label
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
            this.cityName = list[index].label
            this.districtValue = -1
            if(this.type === 'edit'){
                this.districtValue = parseInt(this.instance.districtValue)
            }
        },
        districtValue(val){
            if(val === -1) return 
            let list = this.districtList
            let index = list.findIndex(item => {
                return item.value === val
            })
            this.districtName = list[index].label
        }
    },
    methods:{
        add(){
            let {name,tel,provinceValue,cityValue,districtValue,provinceName,cityName,districtName,address} = this
            let data = {name,tel,provinceValue,cityValue,districtValue,provinceName,cityName,districtName,address}
            if(data.name==='' || data.tel==='' || data.provinceValue=== -1 || data.cityValue=== -1 ||
            data.districtValue=== -1 || data.address===''){
                alert('请填写完整信息')
            }else{
                if(this.type === 'add'){
                    this.$store.dispatch('addAction', data)
                    this.$router.push('/address')
                }
                if(this.type === 'edit'){
                    data.id = this.id
                    this.$store.dispatch('updateAction', data)
                    this.$router.push('/address')
                }
            }
        },
        remove(){
            if(window.confirm('确定删除？')){
                this.$store.dispatch('removeAction', this.id)
                this.$router.push('/address')
            }
        },
        setDefault(){
                this.$store.dispatch('setDefaultAction', this.id)
                this.$router.push('/address')
        }
    },
    computed:{

    }
}