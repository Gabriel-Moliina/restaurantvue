<template lang="html">

  <section class="src-pages-login-view">
    <form class="was-validated">
      <div class="row justify-content-md-center mb-3">
        <input type="email" class="form-control input-login" placeholder="Email" aria-label="Username"
          v-model="userName">
      </div>
      <div class="row justify-content-md-center mb-3">
        <input type="password" class="form-control input-login" placeholder="Senha" aria-label="Senha"
          v-model="password">
      </div>
      <div class="row justify-content-md-center mb-3">
        <button v-on:click.prevent="login" type="submit" class="btn btn-success btn-login">Login</button>
      </div>
      <div class="row justify-content-md-center">
        <button v-on:click="$router.push('/login/create')" class="btn btn-success btn-login">Cadastrar</button>
      </div>
    </form>
  </section>

</template>

<script lang="js">

import UserService from '@/services/UserService';
import { RouterLink } from 'vue-router';

export default {
  name: 'src-views-login',
  props: [],
  mounted() {

  },
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    login() {
      UserService.Login(this.userName, this.password)
        .then(response => {
          sessionStorage.setItem("token", response.data.data.token);
          this.$router.push('/home')
        }).catch(reseponse => {

        })
    }
  },
  computed: {

  }
}


</script>

<style></style>
