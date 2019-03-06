// Vue インスタンスの生成
var vm = new Vue({
el: '#Vue', //データバインディングの対象となる、DOM要素を指定
data: {input: '' ,
    todos: JSON.parse(localStorage.getItem('todos')) || [],
},
mounted(){
},
  methods: {addTodo: function (event){
    // 空の場合追加されないように
    if (this.input){
      this.todos.push({title: this.input, done: false});
      // 追加後にinputを空に
      this.input = ''
      this.setTodos()
    }
  },
  doneTodo: function (todo){
      this.setTodos()
  },
  deleteTodo: function (todo){
    var index = this.todos.indexOf(todo);
    this.todos.splice(index, 1)
      this.setTodos()
  },
  // localStrageに保存
  setTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.setTodos()
  }
}
})