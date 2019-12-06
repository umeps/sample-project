
Vue.config.devtools = true;

const app =new Vue({
    el:'#app',
    data:{
        title:'todo list',
        newTodo:'',
        todos:[],
        selected: '',
        options: [
            { id: 1, name: '完了' },
            { id: 2, name: '途中' },
            { id: 3, name: '未着手' }
        ]
    },
    mounted(){
        if(window.localStorage){// localStorageが使用できるかチェック
            if(window.localStorage.getItem("todoList")){// todoListがキーとしてあるかチェック
                let json = window.localStorage.getItem("todoList");// todoListを取り出し
                this.todos = JSON.parse(json); // 文字列をオブジェクトに変換
            }
        }
    },
    watch:{
        todos(){// todosが変更されたあとに,dataを更新
            this.setLocalStorage()
        }
    },
    methods: {
        setLocalStorage: function(){
            let json = JSON.stringify(this.todos); //オブジェクトを文字列に変換
            window.localStorage.setItem('todoList' , json);// オブジェクトをlocalStorageに保存
        },
        addTodo(){
            this.todos.push({
                title: this.newTodo,
                done:false,
            });
                this.newTodo = '',
                console.log(select)
        },
        deleteTodo(index){
            this.todos.splice(index , 1);　
        },
        allDone(){
            this.todos = [];
        }
    },
})
