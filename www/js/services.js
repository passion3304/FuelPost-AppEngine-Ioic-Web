app.service('TodosService', function($q) {
  return {
    todos: [
      {
        id: '1',
        name: 'Pick up apples',
        done: false
      },
      {
        id: '2',
        name: 'Mow the lawn',
        done: true
      }
    ],
    getTodos: function() {
      return this.todos
    },
    getTodo: function(todoId) {
      var dfd = $q.defer()
      this.todos.forEach(function(todo) {
        if (todo.id === todoId) dfd.resolve(todo)
      })

      return dfd.promise
    }

  }
})