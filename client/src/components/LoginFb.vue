<template>
  <div class="container">
      <div class="row">
          <div class="col-md-12">
            <div class="wrap">
                <h1 class="form-title">
                  Welcome To Your To-Do Fancy Application
                </h1>
                <br>
                <div class="image-todo">
                  <img src="http://blog.slideroom.com/content/images/2017/03/decision-letter-3.png" alt="" />
                </div>
                <form class="login">
                  <div class="social-buttons">
                    <a class="btn btn-block btn-social btn-facebook" @click="loginFb">
                      <i class="fa fa-facebook"></i> Sign in with Facebook
                    </a>
                  </div>
                </form>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    beforeCreate(){
      let token = localStorage.getItem('token')
      if (token) {
        this.$router.push('/'+'Kautzar%20Alibani')
      }else {
        this.$router.push('/')
      }
    },
    methods:{
      loginFb(){
        let self = this
        FB.login((response) => {
          if (response.authResponse) {
            FB.api('/me?fields=email, name', function (res){
              self.$http.post('/auth/login',{
                accessToken: response.authResponse.accessToken,
                userId: response.authResponse.userID,
                email: res.email,
                username: res.name,
                password: res.id
              })
              .then((respon) => {
                if(!respon.data){
                  self.$swal({
                    title: 'Ooops',
                    text: 'Problem With Authentication',
                    icon: 'error',
                    button: 'OK'})
                }else{
                  localStorage.setItem("token", respon.data)
                  self.$swal({
                    icon: 'success',
                    text: 'Login Success!!',
                    button: 'OK'
                  }).then(() => {
                    self.$router.push('/'+res.name)
                    location.reload()
                  })
                }
              }).catch((err) => {
                console.log(err);
              })
            })
          }else {
            console.log('User cancelled login or did not fully authorize.');
          }
        },{scope:'public_profile,email'})
      }
    }
  }
</script>

<style scoped>
  @import "../assets/css/style.css";
</style>
