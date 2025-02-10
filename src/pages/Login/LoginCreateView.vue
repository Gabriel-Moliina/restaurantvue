<template lang="html">

<section class="src-pages-login-create-view">
  <div class="row justify-content-md-center mb-3">
    <input type="text" class="form-control input-login" placeholder="Email" aria-label="Username" v-model="userName">
  </div>
  <div class="row justify-content-md-center mb-3">
    <input type="password" class="form-control input-login" placeholder="Senha" aria-label="Senha" v-model="password">
  </div>
  <div class="row justify-content-md-center mb-3">
    <input type="password" class="form-control input-login" placeholder="Confirmar Senha" aria-label="Confirmar Senha" v-model="confirmPassword">
  </div>
  <div class="row justify-content-md-center mb-3">
    <button v-on:click="register" type="submit" class="btn btn-success btn-login">Confirmar</button>
  </div>
  <div class="row justify-content-md-center">
    <RouterLink to="/login"><button v-on:click="login"
        class="btn btn-success btn-login">Voltar</button></RouterLink>
  </div>
</section>

</template>

<script>
import axios from 'axios';

export default {
  name: 'src-pages-login-create-view',
  props: [],
  mounted() {

  },
  data() {
    return {
      userName: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    register(){
      axios
        .post("http://localhost:5142/api/User/Create", { Email: this.userName, Password: this.password, ConfirmPassword: this.confirmPassword })
        .then(response => {
          sessionStorage.setItem("token", response.data.data.token);
        }).catch(reseponse => {

        })
    }
  },
  computed: {

  }
}


</script>

<style></style>
