// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from "axios"
import App from './App'
import router from './router'
import swal from 'sweetalert'

const swalPlugin={}
swalPlugin.install = (Vue) => {
  Vue.prototype.$swal = swal
}
Vue.use(swalPlugin)

const my_axios = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers:{
    Authorization : localStorage.getItem('token')
  }
});
Vue.prototype.$http = my_axios

Vue.config.productionTip = false

window.fbAsyncInit = function() {
  FB.init({
    appId      : 357648931350956,
    xfbml      : true,
    version    : 'v2.10'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
