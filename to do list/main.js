// Vue インスタンスの生成
var vm = new Vue({
    el: '#Vue', //データバインディングの対象となる、DOM要素を指定
    data: { input: '' ,
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    },
    mounted(){
    },
      methods: {
        addTodo: function (){
          if(this.input)
          {this.todos.push({title: this.input, done: false});
         
          this.input = ''
          this.setTodos()
        }
        }
      }
    })