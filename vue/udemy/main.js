Vue.component('my-com', {
    data(){
        return{
            number:1
        }
    },
    template:'<div>{{ number }}</div>'
})

new Vue({
    el:'#app',
    data:{
        count:0,
        act: true,
        tColor:'red',
        bgColor:'blue',
        object:{
            color:'red',
            'background-color':'blue',
        },
        fruits:[
            'りんご',
            'バナナ',
            'ぶどう',
        ],


    },
    methods: {
        countUp: function(){
            this.count +=1;
        },
        remove: function(){
            this.fruits.shift();
        },
    },
    computed: {
        less: function(){
            return this.count > 3? "3以上": "3以下"
        },
        obj: function(){
            return{
            red: this.act,
            bgBlue: !this.act
            }
        },
    },
})


