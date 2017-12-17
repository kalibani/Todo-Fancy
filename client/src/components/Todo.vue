<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <a class="navbar-brand"><i class="glyphicon glyphicon-bullhorn"></i>
          Hai {{ profile.username }}, Welcome to Your To-Do List App</a>
          <ul class="nav navbar-nav navbar-right">
            <router-link to="/" class="navbar-brand">
              <span @click="doLogout">Log out</span>
            </router-link>
          </ul>
      </div>
    </nav>
    <div class="container" id="events">
      <div class="row">
        <div class="col-sm-6">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3>What's Your Plan ?</h3>
            </div>
            <div class="panel-body">
              <div>
                <form id="login-form" role="form" style="display: block;">
                <input class="form-control" placeholder="Title" v-model="Todo.todo">
                <textarea class="form-control" placeholder="Description" v-model="Todo.description"></textarea>
                <div class="form-group">
                  <input type="date" class="form-control" placeholder="Date" v-model="Todo.date">
                </div>
                <button class="btn btn-primary" @click="addTodo" >Submit</button>
              </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="list-group">
            <ul class="list-group-item" v-for="(Todo, index) in Todos">

                <h3 class="list-group-item-heading"><i class="glyphicon glyphicon-bullhorn"></i> {{ Todo.todo }}</h3>
                <h4><i class="glyphicon glyphicon-calendar" v-if="Todo.date"></i> {{ Todo.date }}</h4>
                <p class="list-group-item-text" v-if="Todo.description">{{ Todo.description }}</p>
                <br>
                <div class="[ form-group ]" style="float:right;">
                  <input type="checkbox" name="fancy-checkbox-primary" id="fancy-checkbox-primary" autocomplete="off" />
                  <div class="[ btn-group ]">
                    <label for="fancy-checkbox-primary" class="[ btn btn-primary ]">
                      <span class="[ glyphicon glyphicon-ok ]"></span>
                      <span> </span>
                    </label>
                    <label for="fancy-checkbox-primary" class="[ btn btn-default active ]">
                      Complete
                    </label>
                  </div>
                </div>
                <button style="float:left;" class="btn btn-sm btn-danger" @click= "removeTodo(index, Todo._id)">Delete</button>
                <br><br>
            </ul>
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
        Todo:{ todo: '', description:'', date:'', status:false },
        Todos:[],
        profile:[],
        on: {
          "click": function($event) {
            $event.preventDefault()
          }
        }
      }
    },

    beforeMount(){
      this.getProfile()
    },
    created() {
      this.getTodo()
    },

    methods:{
      addTodo() {
        this.$http.post('/post/todo', this.Todo)
        .then((response) => {
          location.reload()
        })
        .catch((err) => {
          console.log(err);
        })
      },

      getTodo() {
        this.$http.get('/todos')
        .then((response) => {
          this.Todos = response.data
        })
        .catch((err) => {
          console.log(err);
        })
      },

      removeTodo(index, _id){
        this.$swal({
          title: 'Are you sure?',
          text: 'You will not be able to recover this task!',
          icon: 'warning',
          buttons: true,
          buttons: ['No, keep it', 'Yes, delete it!']
        }).then((result) => {
          if (result) {
            this.$http.delete('/delete/todo/'+_id)
            .then(() => {
              this.Todos.splice(index, 1)
            }).catch((err) => {
              console.log(err);
            })
          }
        }).catch((err) => {
          console.log(err);
        })
      },

      getProfile(){
        this.$http.get('/profile')
        .then((response) => {
          this.profile = response.data
        })
        .catch((err) => {
          console.log(err);
        })
      },

      doLogout(){
        FB.logout()
        localStorage.removeItem("token")
      }
    }
  }
</script>

<style scoped="" lang="css">
  .form-control { margin-bottom: 10px; }
  .navbar       { border-radius:0; }
  .form-group input[type="checkbox"] {
    display: none;
  }

  .form-group input[type="checkbox"] + .btn-group > label span {
    width: 20px;
  }

  .form-group input[type="checkbox"] + .btn-group > label span:first-child {
    display: none;
  }
  .form-group input[type="checkbox"] + .btn-group > label span:last-child {
    display: inline-block;
  }

  .form-group input[type="checkbox"]:checked + .btn-group > label span:first-child {
    display: inline-block;
  }
  .form-group input[type="checkbox"]:checked + .btn-group > label span:last-child {
    display: none;
  }
</style>
