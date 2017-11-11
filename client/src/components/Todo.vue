<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <a class="navbar-brand"><i class="glyphicon glyphicon-bullhorn"></i> Welcome to Your To-Do List Board</a>
      </div>
    </nav>
    <div class="container" id="events">
      <div class="row">
        <div class="col-sm-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>Create Your Plan :</h3>
            </div>
            <div class="panel-body">
              <div>
                <form id="login-form" v-on:submit="addTodo" role="form" style="display: block;">
                <input class="form-control" placeholder="Plan To do" v-model="Todo.name">
                <textarea class="form-control" placeholder="Description" v-model="Todo.description"></textarea>
                <div class="form-group">
                  <input type="date" class="form-control" placeholder="Date" v-model="Todo.date">
                </div>
                <button class="btn btn-primary">Submit</button>
              </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="list-group">
            <a href="#" class="list-group-item" v-for="(Todo, index) in Todos">
              <h4 class="list-group-item-heading"><i class="glyphicon glyphicon-bullhorn"></i> {{ Todo.name }}</h4>
              <h5><i class="glyphicon glyphicon-calendar" v-if="Todo.date"></i> {{ Todo.date }}</h5>
              <p class="list-group-item-text" v-if="Todo.description">{{ Todo.description }}</p>
              <button class="btn btn-xs btn-danger" v-on:click= "removeTodo(index, Todo._id)">Delete</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todolist',
  data(){
    return {
      Todo:{ name: '', description:'', date:'', status:false },
      Todos:[]
    }

  },

  created: function() {
    this.getTodo()
  },

  methods:{
    addTodo() {
      var self = this
      this.$http.post('/todos', this.Todo).then((response) => {
        this.Todos.push(this.Todo);
        console.log('Succesfully add todo');
      }).catch((err) => {
        console.log(err);
      })

    },

    getTodo() {
      var self = this
      this.$http.get('/todos').then((response) => {
        this.Todos = response.data
        console.log('ini todos===', this.Todos);
      }).catch((err) => {
        console.log(err);
      })
    },

    removeTodo(index, _id){
      var self = this
      this.$http.delete('/todos/'+_id).then((response) => {
        console.log(response);
        this.Todos.splice(index, 1)
      }).catch((err) => {
        console.log(err);
      })
    }

  },


}
</script>

<style lang="css">
  .form-control { margin-bottom: 10px; }
  .navbar       { border-radius:0; }
</style>
