var vm = new Vue({
    el: '#Vue',
    data: {
        list: [],
        page: 0,
        maxSize: 10,
        search: '',
        tempSearch: '',
        bookmarkList: []

    },
    mounted() {
        if (window.localStorage) {// localStorageが使用できるかチェック
            if (window.localStorage.getItem("bookmark")) {// bookmarkがキーとしてあるかチェック
                var json = window.localStorage.getItem("bookmark");// bookmarkを取り出し
                this.bookmarkList = JSON.parse(json); // 文字列をオブジェクトに変換
            }
        }
        axios
            .get('https://api.reiwa-system.tokyo/products')
            .then(response => {
                this.list = response.data.map(item=>{
                    item.open = false
                    return item
                })
            })
    },
    watch: {
        bookmarkList() {
            this.setLocalStorage()
        },
        page(){
            this.list.map(item => item.open = false)
        }
    },
    computed: {
        tmpList(){
            return this.tempSearch === '' ? this.list : this.searchList
        },
        searchList(){
            return this.list.filter(item => item.title.indexOf(this.tempSearch) != -1)
        },
        displayList(){
            return this.tmpList.slice(this.maxSize * this.page, (this.maxSize * this.page) + this.maxSize)
        },
        pages(){
            return Math.floor(this.tmpList.length / this.maxSize) + (this.tmpList.length % this.maxSize === 0 ? 0 : 1)
            // ( 20 / 2 ) + ( 20 % 2 === 0 ? 0 : 1 )
            // ( 10 ) + ( 0 or 1 )
        },
        isNotPrev(){
            return this.page > 0 ? false : true
        },
        isNotNext() {
            return this.page >= this.pages - 1 ? true : false
        }
    },
    methods: {
        setLocalStorage: function () {
            const json = JSON.stringify(this.bookmarkList); //オブジェクトを文字列に変換
            window.localStorage.setItem('bookmark', json);// オブジェクトをlocalStorageに保存
        },
        clickMenu(id){
            this.list.filter(item => item.id === id).map(item => item.open = !item.open)
        },
        next(){
            this.page += 1
        },
        prev(){
            this.page -= 1
        },
        clickPage(number){
            this.page = number - 1
            this.currentPage = number
        },
        isBookmark(id){
            return this.bookmarkList.find(item => item.id === id)
        },
        toggleBookmark(item){
            if (this.isBookmark(item.id)){
                this.sliceBookmark(item.id)
            } else {
                this.pushBookmark(item)
            }
        },
        pushBookmark(item) {
            this.bookmarkList.push(item)
        },
        sliceBookmark(id) {
            this.bookmarkList = this.bookmarkList.filter(item => item.id !== id)
        // },
        // clickSearch(){
        //     this.search = this.tempSearch
        //     this.page = 0
        }
    },
    filters: {
        price(value) {
            return value.toLocaleString();
        },
        moment(date) {
            return moment(date).format('YYYY/MM/DD HH:mm');// eslint-disable-line
        }
    }
})