import Vue from 'vue'
import Router from 'vue-router'
import LoginFb from '@/components/LoginFb'
import Todo from '@/components/Todo';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'LoginFb',
      component: LoginFb
    },
    {
      path: '/:username',
      name: 'todolist',
      component: Todo,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token')
        if (token) {
          next()
        }else {
          swal({
            title: 'Ooops',
            text: `You don't Have Access! `,
            icon: 'error',
            button: 'OK'
          })
          next('/')
        }
      }
    }
  ],
  mode: 'history'
})
