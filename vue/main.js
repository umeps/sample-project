Vue.config.devtools = true;

let app = new Vue({
    el:'#app',

    data: {
        brand:"Mastary",
        product:"Socks",
        image:"https://d2mxuefqeaa7sj.cloudfront.net/s_ACF2B3FED5F7644A8E27E3FE8A9142BB95ECC3C792EA9166BF492FA2116B5277_1517608730821_Screen+Shot+2018-02-02+at+4.58.29+PM.png",
        inventory: 1,
        details:["80% cotton", "20% polyester", "Genderless"],
        variants:[
            {
                id:2234,
                color: "green",
                image:"https://d2mxuefqeaa7sj.cloudfront.net/s_ACF2B3FED5F7644A8E27E3FE8A9142BB95ECC3C792EA9166BF492FA2116B5277_1517608730821_Screen+Shot+2018-02-02+at+4.58.29+PM.png",
                
            },
            {
                id:2235,
                color: "blue",
                image:"https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
             
            }
        ],


        cart:0,
        instock:false,
    },

    methods: {
        addCart(){
            this.cart += 1
            },

        removeCart(){
            this.cart -= 1
        },

        pointerColor(image){
            this.image = image
            },
        },

    computed: {
        title(){
            return this.brand + '' +this.product
            },
        },



    })
